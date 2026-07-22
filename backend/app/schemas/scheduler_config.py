from pydantic import BaseModel, ConfigDict


class SchedulerConfigResponse(BaseModel):

    id: int

    algorithm: str

    priority_enabled: bool

    model_config = ConfigDict(from_attributes=True)


class SchedulerConfigUpdate(BaseModel):

    algorithm: str

    priority_enabled: bool