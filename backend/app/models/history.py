from sqlalchemy import Column, Integer, String, TIMESTAMP, text

from app.models.base import Base


class SchedulingHistory(Base):
    __tablename__ = "scheduling_history"

    id = Column(Integer, primary_key=True, index=True)

    job_id = Column(Integer, nullable=False)

    node_name = Column(String(100), nullable=True)

    action = Column(String(50), nullable=False)

    message = Column(String(255), nullable=False)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )