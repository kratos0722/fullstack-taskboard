from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app

# Isolated in-memory database shared across the test session.
engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
TestSession = sessionmaker(bind=engine)
Base.metadata.create_all(bind=engine)


def _override_get_db():
    db = TestSession()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = _override_get_db
client = TestClient(app)


def test_create_defaults_and_list():
    r = client.post("/api/tasks", json={"title": "Write README", "priority": "high"})
    assert r.status_code == 201
    body = r.json()
    assert body["status"] == "todo"
    assert body["priority"] == "high"

    listed = client.get("/api/tasks").json()
    assert any(t["title"] == "Write README" for t in listed)


def test_empty_title_rejected():
    r = client.post("/api/tasks", json={"title": ""})
    assert r.status_code == 422


def test_update_status():
    task_id = client.post("/api/tasks", json={"title": "Deploy"}).json()["id"]
    r = client.patch(f"/api/tasks/{task_id}", json={"status": "done"})
    assert r.status_code == 200
    assert r.json()["status"] == "done"


def test_get_missing_returns_404():
    assert client.get("/api/tasks/999999").status_code == 404


def test_filter_by_status():
    client.post("/api/tasks", json={"title": "In flight", "status": "in_progress"})
    r = client.get("/api/tasks", params={"status": "in_progress"})
    assert r.status_code == 200
    assert all(t["status"] == "in_progress" for t in r.json())


def test_delete():
    task_id = client.post("/api/tasks", json={"title": "Temp"}).json()["id"]
    assert client.delete(f"/api/tasks/{task_id}").status_code == 204
    assert client.get(f"/api/tasks/{task_id}").status_code == 404
