"""FastAPI application entry point."""

from __future__ import annotations

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import tasks

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Taskboard API", version="1.0.0")

# CORS: the Next.js frontend origin(s). Comma-separated via CORS_ORIGINS, default localhost.
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)


@app.get("/health", tags=["meta"])
def health():
    return {"status": "ok"}
