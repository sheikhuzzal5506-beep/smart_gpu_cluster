from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import (
    auth,
    dashboard,
    nodes,
    jobs,
    monitoring,
    history,
    scheduler,
    scheduler_config,
    users,
)

app = FastAPI(
    title="Intelligent GPU Cluster Scheduler API",
    version="1.0.0",
)

# ==========================================================
# CORS Configuration
# ==========================================================

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

# ==========================================================
# Register Routers
# ==========================================================

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(dashboard.router)
app.include_router(nodes.router)
app.include_router(jobs.router)
app.include_router(monitoring.router)
app.include_router(history.router)
app.include_router(scheduler.router)
app.include_router(scheduler_config.router)

# ==========================================================
# Root Endpoint
# ==========================================================

@app.get("/")
def root():
    return {
        "message": "Intelligent GPU Cluster Scheduler API is running!"
    }