from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.monitoring_service import get_cluster_status
from app.core.security import get_current_user

router = APIRouter(
    prefix="/monitoring",
    tags=["Monitoring"],
)


# ==========================================================
# Cluster Monitoring (Any Logged-in User)
# ==========================================================

@router.get("/")
def monitoring(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_cluster_status(db)