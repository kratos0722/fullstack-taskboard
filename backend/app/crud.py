"""Database operations for tasks."""

from __future__ import annotations

from sqlalchemy.orm import Session

from app import models, schemas


def list_tasks(db: Session, status: models.Status | None = None) -> list[models.Task]:
    query = db.query(models.Task)
    if status is not None:
        query = query.filter(models.Task.status == status)
    return query.order_by(models.Task.created_at.desc(), models.Task.id.desc()).all()


def get_task(db: Session, task_id: int) -> models.Task | None:
    return db.get(models.Task, task_id)


def create_task(db: Session, data: schemas.TaskCreate) -> models.Task:
    task = models.Task(**data.model_dump())
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def update_task(db: Session, task: models.Task, data: schemas.TaskUpdate) -> models.Task:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(task, field, value)
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task: models.Task) -> None:
    db.delete(task)
    db.commit()
