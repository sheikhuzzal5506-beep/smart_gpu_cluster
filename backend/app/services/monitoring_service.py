from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.history import SchedulingHistory
from app.models.job import Job
from app.models.node import GPUNode


def get_cluster_status(db: Session):

    total_nodes = db.query(GPUNode).count()

    online_nodes = db.query(GPUNode).filter(
        GPUNode.status == "Online"
    ).count()

    maintenance_nodes = db.query(GPUNode).filter(
        GPUNode.status == "Maintenance"
    ).count()

    total_gpus = db.query(
        func.sum(GPUNode.total_gpus)
    ).scalar() or 0

    available_gpus = db.query(
        func.sum(GPUNode.available_gpus)
    ).scalar() or 0

    avg_utilization = db.query(
        func.avg(GPUNode.utilization_percent)
    ).scalar() or 0

    avg_temperature = db.query(
        func.avg(GPUNode.temperature)
    ).scalar() or 0

    running_jobs = db.query(Job).filter(
        Job.status == "Running"
    ).count()

    pending_jobs = db.query(Job).filter(
        Job.status == "Pending"
    ).count()

    completed_jobs = db.query(Job).filter(
        Job.status == "Completed"
    ).count()

    recent_activity = (
        db.query(SchedulingHistory)
        .order_by(SchedulingHistory.created_at.desc())
        .limit(10)
        .all()
    )

    return {
        "nodes": {
            "total": total_nodes,
            "online": online_nodes,
            "maintenance": maintenance_nodes,
        },
        "gpus": {
            "total": total_gpus,
            "available": available_gpus,
            "used": total_gpus - available_gpus,
            "average_utilization": round(avg_utilization, 2),
            "average_temperature": round(avg_temperature, 2),
        },
        "jobs": {
            "running": running_jobs,
            "pending": pending_jobs,
            "completed": completed_jobs,
        },
        "recent_activity": recent_activity,
    }