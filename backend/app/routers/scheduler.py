from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.job import JobResponse
from app.services.scheduler_service import (
    get_scheduler_queue,
    schedule_pending_jobs,
)

router = APIRouter(
    prefix="/scheduler",
    tags=["Scheduler"],
)


@router.get("/queue", response_model=list[JobResponse])
def get_queue(db: Session = Depends(get_db)):
    """
    Get all pending jobs waiting for scheduling.
    """
    return get_scheduler_queue(db)


@router.post("/run")
def run_scheduler(db: Session = Depends(get_db)):
    """
    Run the intelligent scheduler.
    """
    return schedule_pending_jobs(db)