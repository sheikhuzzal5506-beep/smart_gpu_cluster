from sqlalchemy.orm import Session

from app.models.job import Job
from app.schemas.job import JobCreate, JobUpdate
from app.services.scheduler_service import schedule_job
from app.services.history_service import add_history


def create_job(db: Session, job: JobCreate):
    db_job = Job(
        job_name=job.job_name,
        user_name=job.user_name,
        gpu_required=job.gpu_required,
        gpu_memory_required=job.gpu_memory_required,
        priority=job.priority,
        status="Pending",
        assigned_node=None,
    )

    db.add(db_job)
    db.commit()
    db.refresh(db_job)

    # Record job submission
    add_history(
        db=db,
        job_id=db_job.id,
        node_name=None,
        action="Submitted",
        message="Job submitted successfully",
    )

    # Automatically schedule the job
    schedule_job(db, db_job)

    db.refresh(db_job)

    return db_job


def get_jobs(db: Session):
    return db.query(Job).all()


def get_job(db: Session, job_id: int):
    return db.query(Job).filter(Job.id == job_id).first()


def update_job(db: Session, job_id: int, job: JobUpdate):
    db_job = get_job(db, job_id)

    if not db_job:
        return None

    db_job.job_name = job.job_name
    db_job.user_name = job.user_name
    db_job.gpu_required = job.gpu_required
    db_job.gpu_memory_required = job.gpu_memory_required
    db_job.priority = job.priority
    db_job.status = job.status
    db_job.assigned_node = job.assigned_node

    db.commit()
    db.refresh(db_job)

    return db_job


def delete_job(db: Session, job_id: int):
    db_job = get_job(db, job_id)

    if not db_job:
        return None

    db.delete(db_job)
    db.commit()

    return db_job