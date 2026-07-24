from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.dashboard_service import get_dashboard
from app.core.security import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


# ==========================================================
# Dashboard (Any Logged-in User)
# ==========================================================

@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_dashboard(db)