from sqlalchemy.orm import Session

from app.models.node import GPUNode
from app.schemas.node import NodeCreate, NodeUpdate


def calculate_metrics(node: GPUNode):

    used_gpus = node.total_gpus - node.available_gpus

    if node.total_gpus > 0:
        utilization = int((used_gpus / node.total_gpus) * 100)
    else:
        utilization = 0

    node.utilization_percent = utilization

    node.power_usage = utilization * 3

    node.temperature = 35 + int(utilization * 0.4)

    if node.status == "Maintenance":
        node.health_status = "Maintenance"

    elif utilization >= 90:
        node.health_status = "Busy"

    else:
        node.health_status = "Healthy"


def create_node(db: Session, node: NodeCreate):

    db_node = GPUNode(
        node_name=node.node_name,
        ip_address=node.ip_address,
        cpu_cores=node.cpu_cores,
        ram_gb=node.ram_gb,
        gpu_model=node.gpu_model,
        gpu_memory_gb=node.gpu_memory_gb,
        total_gpus=node.total_gpus,
        available_gpus=node.available_gpus,
        status=node.status,
    )

    calculate_metrics(db_node)

    db.add(db_node)
    db.commit()
    db.refresh(db_node)

    return db_node


def get_nodes(db: Session):
    return db.query(GPUNode).all()


def get_node(db: Session, node_id: int):
    return db.query(GPUNode).filter(GPUNode.id == node_id).first()


def update_node(db: Session, node_id: int, node: NodeUpdate):

    db_node = db.query(GPUNode).filter(GPUNode.id == node_id).first()

    if not db_node:
        return None

    db_node.node_name = node.node_name
    db_node.ip_address = node.ip_address
    db_node.cpu_cores = node.cpu_cores
    db_node.ram_gb = node.ram_gb
    db_node.gpu_model = node.gpu_model
    db_node.gpu_memory_gb = node.gpu_memory_gb
    db_node.total_gpus = node.total_gpus
    db_node.available_gpus = node.available_gpus
    db_node.status = node.status

    calculate_metrics(db_node)

    db.commit()
    db.refresh(db_node)

    return db_node


def delete_node(db: Session, node_id: int):

    db_node = db.query(GPUNode).filter(GPUNode.id == node_id).first()

    if not db_node:
        return None

    db.delete(db_node)
    db.commit()

    return db_node