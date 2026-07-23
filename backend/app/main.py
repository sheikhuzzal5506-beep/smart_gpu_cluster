from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database import SessionLocal, engine
from app.models import Base

from app.models.user import User
from app.models.node import GPUNode
from app.models.job import Job
from app.models.history import SchedulingHistory
from app.models.scheduler_config import SchedulerConfig

from app.routers.users import router as users_router
from app.routers.nodes import router as nodes_router
from app.routers.jobs import router as jobs_router
from app.routers.dashboard import router as dashboard_router
from app.routers.history import router as history_router
from app.routers.monitoring import router as monitoring_router
from app.routers.scheduler_config import (
    router as scheduler_config_router,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Intelligent GPU Cluster Scheduler API",
    version="1.0.0",
)

# ===========================
# CORS CONFIGURATION
# ===========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===========================
# Routers
# ===========================

app.include_router(users_router)
app.include_router(nodes_router)
app.include_router(jobs_router)
app.include_router(dashboard_router)
app.include_router(history_router)
app.include_router(monitoring_router)
app.include_router(scheduler_config_router)


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
            "result": result.scalar(),
        }

    finally:
        db.close()