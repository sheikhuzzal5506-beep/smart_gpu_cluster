from sqlalchemy.orm import Session

from app.models.job import Job
from app.models.node import GPUNode
from app.models.scheduler_config import SchedulerConfig
from app.services.history_service import add_history


# -------------------------------------------------
# Configuration
# -------------------------------------------------

def get_scheduler_config(db: Session):

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


# -------------------------------------------------
# Available Nodes
# -------------------------------------------------

def get_available_nodes(db: Session, job: Job):

    return (
        db.query(GPUNode)
        .filter(
            GPUNode.status == "Online",
            GPUNode.available_gpus >= job.gpu_required,
            GPUNode.gpu_memory_gb >= job.gpu_memory_required,
        )
        .order_by(GPUNode.id.asc())
        .all()
    )


# -------------------------------------------------
# Least Loaded
# -------------------------------------------------

def least_loaded_algorithm(db: Session, job: Job):

    nodes = get_available_nodes(db, job)

    if not nodes:
        return None

    return max(nodes, key=lambda n: n.available_gpus)


# -------------------------------------------------
# First Fit
# -------------------------------------------------

def first_fit_algorithm(db: Session, job: Job):

    nodes = get_available_nodes(db, job)

    if not nodes:
        return None

    return nodes[0]


# -------------------------------------------------
# Best Fit
# -------------------------------------------------

def best_fit_algorithm(db: Session, job: Job):

    nodes = get_available_nodes(db, job)

    if not nodes:
        return None

    return min(
        nodes,
        key=lambda n: n.available_gpus - job.gpu_required,
    )


# -------------------------------------------------
# Round Robin
# -------------------------------------------------

def round_robin_algorithm(db: Session, job: Job):

    nodes = get_available_nodes(db, job)

    if not nodes:
        return None

    node = min(nodes, key=lambda n: n.scheduler_index)

    current = node.scheduler_index

    for n in nodes:
        if n.scheduler_index > current:
            n.scheduler_index -= 1

    node.scheduler_index = len(nodes)

    db.commit()

    return node


# -------------------------------------------------
# Select Algorithm
# -------------------------------------------------

def select_node(db: Session, job: Job):

    algorithm = get_scheduler_config(db).algorithm

    if algorithm == "Least Loaded":
        return least_loaded_algorithm(db, job)

    elif algorithm == "First Fit":
        return first_fit_algorithm(db, job)

    elif algorithm == "Best Fit":
        return best_fit_algorithm(db, job)

    elif algorithm == "Round Robin":
        return round_robin_algorithm(db, job)

    return least_loaded_algorithm(db, job)


# -------------------------------------------------
# Schedule One Job
# -------------------------------------------------

def schedule_job(db: Session, job: Job):

    node = select_node(db, job)

    if node is None:

        job.status = "Pending"

        db.commit()

        add_history(
            db,
            job.id,
            None,
            "Pending",
            "Waiting for available GPU resources",
        )

        return False

    job.assigned_node = node.node_name
    job.status = "Running"

    node.available_gpus -= job.gpu_required

    db.commit()

    add_history(
        db,
        job.id,
        node.node_name,
        "Assigned",
        f"Assigned using {get_scheduler_config(db).algorithm}",
    )

    add_history(
        db,
        job.id,
        node.node_name,
        "Running",
        "Job started successfully",
    )

    return True


# -------------------------------------------------
# Schedule Pending Jobs
# -------------------------------------------------

def schedule_pending_jobs(db: Session):

    config = get_scheduler_config(db)

    jobs = db.query(Job).filter(
        Job.status == "Pending"
    ).all()

    if config.priority_enabled:

        priority = {
            "High": 0,
            "Medium": 1,
            "Low": 2,
        }

        jobs = sorted(
            jobs,
            key=lambda j: priority.get(j.priority, 99),
        )

    else:

        jobs = sorted(
            jobs,
            key=lambda j: j.id,
        )

    for job in jobs:
        schedule_job(db, job)