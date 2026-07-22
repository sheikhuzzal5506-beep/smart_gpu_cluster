from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.node import NodeCreate, NodeUpdate, NodeResponse
from app.services.node_service import (
    create_node,
    get_nodes,
    get_node,
    update_node,
    delete_node,
)

router = APIRouter(
    prefix="/nodes",
    tags=["GPU Nodes"]
)


@router.post("/", response_model=NodeResponse)
def create_new_node(node: NodeCreate, db: Session = Depends(get_db)):
    return create_node(db, node)


@router.get("/", response_model=list[NodeResponse])
def read_nodes(db: Session = Depends(get_db)):
    return get_nodes(db)


@router.get("/{node_id}", response_model=NodeResponse)
def read_node(node_id: int, db: Session = Depends(get_db)):
    node = get_node(db, node_id)

    if node is None:
        raise HTTPException(status_code=404, detail="Node not found")

    return node


@router.put("/{node_id}", response_model=NodeResponse)
def update_existing_node(
    node_id: int,
    node: NodeUpdate,
    db: Session = Depends(get_db),
):
    updated = update_node(db, node_id, node)

    if updated is None:
        raise HTTPException(status_code=404, detail="Node not found")

    return updated


@router.delete("/{node_id}")
def delete_existing_node(node_id: int, db: Session = Depends(get_db)):
    deleted = delete_node(db, node_id)

    if deleted is None:
        raise HTTPException(status_code=404, detail="Node not found")

    return {
        "message": "Node deleted successfully"
    }