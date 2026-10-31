"""SQLAlchemy ORM models."""

from __future__ import annotations

import enum

from sqlalchemy import Column, DateTime, Enum, Integer, String, func

from app.database import Base


class Status(str, enum.Enum):
    todo = "todo"
    in_progress = "in_progress"
    done = "done"


class Priority(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(String(1000), default="")
    status = Column(Enum(Status), default=Status.todo, nullable=False)
    priority = Column(Enum(Priority), default=Priority.medium, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
