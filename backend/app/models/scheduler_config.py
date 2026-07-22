from sqlalchemy import Column, Integer, String, Boolean

from app.models.base import Base


class SchedulerConfig(Base):
    __tablename__ = "scheduler_config"

    id = Column(Integer, primary_key=True, index=True)

    algorithm = Column(
        String(50),
        default="Least Loaded"
    )

    priority_enabled = Column(
        Boolean,
        default=True
    )