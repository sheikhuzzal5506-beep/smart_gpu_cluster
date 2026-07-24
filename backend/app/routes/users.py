from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user import (
    UserCreate,
    UserUpdate,
    UserResponse,
)
from app.services.user_service import (
    create_user,
    get_users,
    get_user,
    update_user,
    delete_user,
)
from app.core.security import require_admin

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return create_user(db, user)


@router.get(
    "/",
    response_model=list[UserResponse],
)
def read_users(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return get_users(db)


@router.get(
    "/{user_id}",
    response_model=UserResponse,
)
def read_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    user = get_user(db, user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user


@router.put(
    "/{user_id}",
    response_model=UserResponse,
)
def update_existing_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    updated = update_user(db, user_id, user)

    if updated is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return updated


@router.delete(
    "/{user_id}",
)
def delete_existing_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    deleted = delete_user(db, user_id)

    if deleted is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {
        "message": "User deleted successfully"
    }