from sqlalchemy.orm import Session

from app.models.job import Job
from app.models.node import GPUNode
from app.models.scheduler_config import SchedulerConfig
from app.services.history_service import add_history


# ==========================================================
# Scheduler Configuration
# ==========================================================

def get_scheduler_config(db: Session):

    config = db.query(SchedulerConfig).first()

    if config is None:
        config = SchedulerConfig(
            algorithm="Least Loaded",
            priority_enabled=True,
        )

        db.add(config)
        db.commit()
        db.refresh(config)

    return config


# ==========================================================
# Available GPU Nodes
# ==========================================================

def get_available_nodes(db: Session, job: Job):

    return (
        db.query(GPUNode)
        .filter(
            GPUNode.status == "Online",
            GPUNode.health_status == "Healthy",
            GPUNode.available_gpus >= job.gpu_required,
            GPUNode.gpu_memory_gb >= job.gpu_memory_required,
        )
        .all()
    )


# ==========================================================
# AI Score
# ==========================================================

def calculate_score(node: GPUNode):

    score = 0

    # More available GPUs = Better
    score += node.available_gpus * 40

    # Lower utilization = Better
    score += (100 - node.utilization_percent)

    # Lower temperature = Better
    score += (100 - node.temperature)

    # Lower power usage = Better
    score += (100 - node.power_usage)

    return score


# ==========================================================
# Scheduling Algorithms
# ==========================================================

def least_loaded_algorithm(db: Session, job: Job):

    nodes = get_available_nodes(db, job)

    if not nodes:
        return None

    return max(nodes, key=calculate_score)


def first_fit_algorithm(db: Session, job: Job):

    nodes = get_available_nodes(db, job)

    if not nodes:
        return None

    return nodes[0]


def best_fit_algorithm(db: Session, job: Job):

    nodes = get_available_nodes(db, job)

    if not nodes:
        return None

    return min(
        nodes,
        key=lambda n: n.available_gpus - job.gpu_required,
    )


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


# ==========================================================
# Select Algorithm
# ==========================================================

def select_node(db: Session, job: Job):

    config = get_scheduler_config(db)

    if config.algorithm == "Least Loaded":
        return least_loaded_algorithm(db, job)

    if config.algorithm == "First Fit":
        return first_fit_algorithm(db, job)

    if config.algorithm == "Best Fit":
        return best_fit_algorithm(db, job)

    if config.algorithm == "Round Robin":
        return round_robin_algorithm(db, job)

    return least_loaded_algorithm(db, job)


# ==========================================================
# Update Node Statistics
# ==========================================================

def update_node_statistics(node: GPUNode):

    used = node.total_gpus - node.available_gpus

    node.utilization_percent = int(
        (used / node.total_gpus) * 100
    )

    node.temperature = min(
        85,
        35 + (used * 8)
    )

    node.power_usage = min(
        100,
        used * 20
    )


# ==========================================================
# Schedule One Job
# ==========================================================

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

    try:

        job.assigned_node = node.node_name
        job.status = "Running"

        node.available_gpus -= job.gpu_required

        update_node_statistics(node)

        db.commit()

        db.refresh(job)
        db.refresh(node)

        config = get_scheduler_config(db)

        add_history(
            db,
            job.id,
            node.node_name,
            "Assigned",
            f"Assigned using {config.algorithm}",
        )

        add_history(
            db,
            job.id,
            node.node_name,
            "Running",
            "Job started successfully",
        )

        return True

    except Exception:

        db.rollback()
        raise


# ==========================================================
# Schedule All Pending Jobs
# ==========================================================

def schedule_pending_jobs(db: Session):

    config = get_scheduler_config(db)

    jobs = (
        db.query(Job)
        .filter(Job.status == "Pending")
        .all()
    )

    if config.priority_enabled:

        priority = {
            "High": 0,
            "Medium": 1,
            "Low": 2,
        }

        jobs = sorted(
            jobs,
            key=lambda j: priority.get(j.priority, 99)
        )

    else:

        jobs = sorted(
            jobs,
            key=lambda j: j.id
        )

    scheduled = 0

    for job in jobs:

        if schedule_job(db, job):
            scheduled += 1

    return {
        "message": "Scheduling completed",
        "algorithm": config.algorithm,
        "jobs_scheduled": scheduled,
        "total_jobs": len(jobs),
    }


# ==========================================================
# Queue
# ==========================================================

def get_scheduler_queue(db: Session):

    return (
        db.query(Job)
        .filter(Job.status == "Pending")
        .all()
    )