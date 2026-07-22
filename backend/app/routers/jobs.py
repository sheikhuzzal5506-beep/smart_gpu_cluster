from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.job import JobCreate, JobUpdate, JobResponse
from app.services.job_service import (
    create_job,
    get_jobs,
    get_job,
    update_job,
    delete_job,
)
from app.services.job_completion_service import complete_job

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post("/", response_model=JobResponse)
def create(job: JobCreate, db: Session = Depends(get_db)):
    return create_job(db, job)


@router.get("/", response_model=list[JobResponse])
def read_all(db: Session = Depends(get_db)):
    return get_jobs(db)


@router.get("/{job_id}", response_model=JobResponse)
def read_one(job_id: int, db: Session = Depends(get_db)):
    job = get_job(db, job_id)

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job


@router.put("/{job_id}", response_model=JobResponse)
def update(job_id: int, job: JobUpdate, db: Session = Depends(get_db)):
    updated_job = update_job(db, job_id, job)

    if not updated_job:
        raise HTTPException(status_code=404, detail="Job not found")

    return updated_job


@router.delete("/{job_id}")
def delete(job_id: int, db: Session = Depends(get_db)):
    deleted_job = delete_job(db, job_id)

    if not deleted_job:
        raise HTTPException(status_code=404, detail="Job not found")

    return {"message": "Job deleted successfully"}


@router.post("/{job_id}/complete")
def complete(job_id: int, db: Session = Depends(get_db)):
    completed_job = complete_job(db, job_id)

    if not completed_job:
        raise HTTPException(status_code=404, detail="Job not found")

    return completed_job