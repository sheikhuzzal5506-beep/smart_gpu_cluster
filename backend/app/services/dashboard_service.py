from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.node import GPUNode
from app.models.job import Job


def get_dashboard(db: Session):

    total_nodes = db.query(GPUNode).count()

    online_nodes = (
        db.query(GPUNode)
        .filter(GPUNode.status == "Online")
        .count()
    )

    offline_nodes = (
        db.query(GPUNode)
        .filter(GPUNode.status == "Offline")
        .count()
    )

    total_gpus = (
        db.query(func.sum(GPUNode.total_gpus))
        .scalar() or 0
    )

    available_gpus = (
        db.query(func.sum(GPUNode.available_gpus))
        .scalar() or 0
    )

    running_jobs = (
        db.query(Job)
        .filter(Job.status == "Running")
        .count()
    )

    pending_jobs = (
        db.query(Job)
        .filter(Job.status == "Pending")
        .count()
    )

    completed_jobs = (
        db.query(Job)
        .filter(Job.status == "Completed")
        .count()
    )

    return {
        "total_nodes": total_nodes,
        "online_nodes": online_nodes,
        "offline_nodes": offline_nodes,
        "total_gpus": total_gpus,
        "available_gpus": available_gpus,
        "used_gpus": total_gpus - available_gpus,
        "running_jobs": running_jobs,
        "pending_jobs": pending_jobs,
        "completed_jobs": completed_jobs,
    }