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
from app.core.security import (
    get_current_user,
    require_admin,
)

router = APIRouter(
    prefix="/scheduler-config",
    tags=["Scheduler Config"],
)


# ==========================================================
# Get Scheduler Configuration (Any Logged-in User)
# ==========================================================

@router.get("/", response_model=SchedulerConfigResponse)
def read_config(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_config(db)


# ==========================================================
# Update Scheduler Configuration (Admin Only)
# ==========================================================

@router.put("/", response_model=SchedulerConfigResponse)
def edit_config(
    config: SchedulerConfigUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return update_config(db, config)