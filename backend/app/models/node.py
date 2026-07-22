from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.models.base import Base


class GPUNode(Base):
    __tablename__ = "gpu_nodes"

    id = Column(Integer, primary_key=True, index=True)

    node_name = Column(String(100), nullable=False)

    ip_address = Column(String(50), nullable=False)

    cpu_cores = Column(Integer, nullable=False)

    ram_gb = Column(Integer, nullable=False)

    gpu_model = Column(String(100), nullable=False)

    gpu_memory_gb = Column(Integer, nullable=False)

    total_gpus = Column(Integer, nullable=False)

    available_gpus = Column(Integer, nullable=False)

    status = Column(String(20), default="Online")

    # -------- Advanced Monitoring --------

    health_status = Column(
        String(20),
        default="Healthy"
    )

    utilization_percent = Column(
        Integer,
        default=0
    )

    temperature = Column(
        Integer,
        default=35
    )

    power_usage = Column(
        Integer,
        default=0
    )

    scheduler_index = Column(
        Integer,
        default=0
    )

    last_heartbeat = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )