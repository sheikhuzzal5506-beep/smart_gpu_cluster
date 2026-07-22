from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class HistoryResponse(BaseModel):
    id: int
    job_id: int
    node_name: Optional[str] = None
    action: str
    message: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)