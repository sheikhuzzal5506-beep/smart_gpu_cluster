from sqlalchemy.orm import Session

from app.models.scheduler_config import SchedulerConfig
from app.schemas.scheduler_config import SchedulerConfigUpdate


def get_config(db: Session):

    config = db.query(SchedulerConfig).first()

    if not config:
        config = SchedulerConfig(
            algorithm="Least Loaded",
            priority_enabled=True,
        )

        db.add(config)
        db.commit()
        db.refresh(config)

    return config


def update_config(db: Session, new_config: SchedulerConfigUpdate):

    config = get_config(db)

    config.algorithm = new_config.algorithm
    config.priority_enabled = new_config.priority_enabled

    db.commit()
    db.refresh(config)

    return config