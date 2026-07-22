from pydantic import BaseModel, ConfigDict


class JobCreate(BaseModel):
    job_name: str
    user_name: str
    gpu_required: int
    gpu_memory_required: int
    priority: str
    status: str = "Pending"
    assigned_node: str | None = None


class JobUpdate(BaseModel):
    job_name: str
    user_name: str
    gpu_required: int
    gpu_memory_required: int
    priority: str
    status: str
    assigned_node: str | None = None


class JobResponse(BaseModel):
    id: int
    job_name: str
    user_name: str
    gpu_required: int
    gpu_memory_required: int
    priority: str
    status: str
    assigned_node: str | None

    model_config = ConfigDict(from_attributes=True)