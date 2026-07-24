from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models.user import User
from app.schemas.auth import RegisterRequest
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


def register_user(db: Session, user: RegisterRequest):
    try:
        # Check if email already exists
        existing_user = (
            db.query(User)
            .filter(User.email == user.email)
            .first()
        )

        if existing_user:
            return None

        # Create user
        db_user = User(
            full_name=user.full_name,
            email=user.email,
            password_hash=hash_password(user.password),
            role=user.role,
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        print("✅ User registered successfully!")

        return db_user

    except SQLAlchemyError as e:
        db.rollback()
        print("\n================ DATABASE ERROR ================\n")
        print(e)
        print("\n===============================================\n")
        raise

    except Exception as e:
        db.rollback()
        print("\n================ UNKNOWN ERROR ================\n")
        print(e)
        print(type(e))
        print("\n==============================================\n")
        raise


def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password_hash):
        return None

    token = create_access_token(
        {
            "sub": user.email,
            "role": user.role,
            "id": user.id,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }