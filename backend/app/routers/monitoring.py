from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.monitoring_service import get_cluster_status

router = APIRouter(
    prefix="/monitoring",
    tags=["Monitoring"]
)


@router.get("/")
def monitoring(db: Session = Depends(get_db)):
    return get_cluster_status(db)