from fastapi import FastAPI
from sqlalchemy import text

from app.database import SessionLocal, engine
from app.models import Base
from app.routers.users import router as users_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Intelligent GPU Cluster Scheduler",
    version="1.0.0"
)

app.include_router(users_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Intelligent GPU Cluster Scheduler API"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }


@app.get("/db-test")
def db_test():
    db = SessionLocal()

    try:
        result = db.execute(text("SELECT 1"))
        return {
            "database": "Connected Successfully",
            "result": result.scalar()
        }
    finally:
        db.close()