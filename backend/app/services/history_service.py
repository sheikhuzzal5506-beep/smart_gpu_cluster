from sqlalchemy.orm import Session

from app.models.history import SchedulingHistory


def add_history(
    db: Session,
    job_id: int,
    node_name: str | None,
    action: str,
    message: str,
):
    history = SchedulingHistory(
        job_id=job_id,
        node_name=node_name,
        action=action,
        message=message,
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return history


def get_all_history(db: Session):
    return (
        db.query(SchedulingHistory)
        .order_by(SchedulingHistory.created_at.desc())
        .all()
    )


def get_job_history(db: Session, job_id: int):
    return (
        db.query(SchedulingHistory)
        .filter(SchedulingHistory.job_id == job_id)
        .order_by(SchedulingHistory.created_at.asc())
        .all()
    )


def get_recent_history(db: Session, limit: int = 10):
    return (
        db.query(SchedulingHistory)
        .order_by(SchedulingHistory.created_at.desc())
        .limit(limit)
        .all()
    )