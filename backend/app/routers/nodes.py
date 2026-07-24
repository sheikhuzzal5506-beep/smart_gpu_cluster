from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.node import (
    NodeCreate,
    NodeUpdate,
    NodeResponse,
)
from app.services.node_service import (
    create_node,
    get_nodes,
    get_node,
    update_node,
    delete_node,
)
from app.core.security import (
    get_current_user,
    require_admin,
)

router = APIRouter(
    prefix="/nodes",
    tags=["GPU Nodes"],
)


# ==========================================================
# Create Node (Admin Only)
# ==========================================================

@router.post("/", response_model=NodeResponse)
def create_new_node(
    node: NodeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return create_node(db, node)


# ==========================================================
# Get All Nodes (Any Logged-in User)
# ==========================================================

@router.get("/", response_model=list[NodeResponse])
def read_nodes(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_nodes(db)


# ==========================================================
# Get Single Node (Any Logged-in User)
# ==========================================================

@router.get("/{node_id}", response_model=NodeResponse)
def read_node(
    node_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    node = get_node(db, node_id)

    if node is None:
        raise HTTPException(
            status_code=404,
            detail="Node not found",
        )

    return node


# ==========================================================
# Update Node (Admin Only)
# ==========================================================

@router.put("/{node_id}", response_model=NodeResponse)
def update_existing_node(
    node_id: int,
    node: NodeUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    updated = update_node(db, node_id, node)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Node not found",
        )

    return updated


# ==========================================================
# Delete Node (Admin Only)
# ==========================================================

@router.delete("/{node_id}")
def delete_existing_node(
    node_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deleted = delete_node(db, node_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Node not found",
        )

    return {
        "message": "Node deleted successfully"
    }