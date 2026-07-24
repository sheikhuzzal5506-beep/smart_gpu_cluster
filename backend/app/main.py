from fastapi import FastAPI

from app.database import engine
from app.models.base import Base

# Import all models (registers them with SQLAlchemy)
import app.models

# Import routers
from app.routers.users import router as users_router
from app.routers.nodes import router as nodes_router
from app.routers.jobs import router as jobs_router
from app.routers.dashboard import router as dashboard_router
from app.routers.monitoring import router as monitoring_router
from app.routers.history import router as history_router
from app.routers.scheduler_config import router as scheduler_config_router
from app.routers.scheduler import router as scheduler_router
from app.routers.auth import router as auth_router

app = FastAPI(
    title="Intelligent GPU Cluster Scheduler API",
    description="Backend API for Intelligent GPU Cluster Scheduler",
    version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(users_router)
app.include_router(nodes_router)
app.include_router(jobs_router)
app.include_router(dashboard_router)
app.include_router(monitoring_router)
app.include_router(history_router)
app.include_router(scheduler_config_router)
app.include_router(scheduler_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "Intelligent GPU Cluster Scheduler API is Running",
        "version": "1.0.0",
        "status": "Online"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "GPU Cluster Scheduler API"
    }