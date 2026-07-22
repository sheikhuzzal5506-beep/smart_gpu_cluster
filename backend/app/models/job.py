from sqlalchemy import Column, Integer, String, TIMESTAMP, text

from app.models.base import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    job_name = Column(String(200), nullable=False)

    user_name = Column(String(100), nullable=False)

    gpu_required = Column(Integer, nullable=False)

    gpu_memory_required = Column(Integer, nullable=False)

    priority = Column(String(20), nullable=False)

    status = Column(String(30), nullable=False, default="Pending")

    assigned_node = Column(String(100), nullable=True)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )