from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.history import HistoryResponse
from app.services.history_service import (
    get_all_history,
    get_job_history,
)

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/", response_model=list[HistoryResponse])
def read_all_history(db: Session = Depends(get_db)):
    return get_all_history(db)


@router.get("/{job_id}", response_model=list[HistoryResponse])
def read_job_history(job_id: int, db: Session = Depends(get_db)):
    return get_job_history(db, job_id)