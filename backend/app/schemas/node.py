from datetime import datetime

from pydantic import BaseModel, ConfigDict


class NodeCreate(BaseModel):
    node_name: str
    ip_address: str
    cpu_cores: int
    ram_gb: int
    gpu_model: str
    gpu_memory_gb: int
    total_gpus: int
    available_gpus: int
    status: str


class NodeUpdate(BaseModel):
    node_name: str
    ip_address: str
    cpu_cores: int
    ram_gb: int
    gpu_model: str
    gpu_memory_gb: int
    total_gpus: int
    available_gpus: int
    status: str

    health_status: str
    utilization_percent: int
    temperature: int
    power_usage: int


class NodeResponse(BaseModel):
    id: int

    node_name: str
    ip_address: str

    cpu_cores: int
    ram_gb: int

    gpu_model: str
    gpu_memory_gb: int

    total_gpus: int
    available_gpus: int

    status: str

    health_status: str
    utilization_percent: int
    temperature: int
    power_usage: int

    scheduler_index: int

    last_heartbeat: datetime

    model_config = ConfigDict(from_attributes=True)