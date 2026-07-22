from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.scheduler_config import (
    SchedulerConfigResponse,
    SchedulerConfigUpdate,
)
from app.services.scheduler_config_service import (
    get_config,
    update_config,
)

router = APIRouter(
    prefix="/scheduler-config",
    tags=["Scheduler Config"],
)


@router.get("/", response_model=SchedulerConfigResponse)
def read_config(db: Session = Depends(get_db)):
    return get_config(db)


@router.put("/", response_model=SchedulerConfigResponse)
def edit_config(
    config: SchedulerConfigUpdate,
    db: Session = Depends(get_db),
):
    return update_config(db, config)