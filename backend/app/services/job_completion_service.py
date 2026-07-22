from sqlalchemy.orm import Session

from app.models.job import Job
from app.models.node import GPUNode
from app.services.scheduler_service import schedule_pending_jobs
from app.services.history_service import add_history


def complete_job(db: Session, job_id: int):

    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        return None

    if job.assigned_node:

        node = (
            db.query(GPUNode)
            .filter(GPUNode.node_name == job.assigned_node)
            .first()
        )

        if node:
            node.available_gpus += job.gpu_required

    job.status = "Completed"

    db.commit()

    # Save completion history
    add_history(
        db=db,
        job_id=job.id,
        node_name=job.assigned_node,
        action="Completed",
        message="Job completed and GPU resources released",
    )

    # Try scheduling waiting jobs
    schedule_pending_jobs(db)

    db.refresh(job)

    return job