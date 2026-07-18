from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine

app = FastAPI(
    title="Intelligent GPU Cluster Scheduler API",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Intelligent GPU Cluster Scheduler API"
    }


@app.get("/health")
def health():
    return {
        "status": "running"
    }


@app.get("/db-test")
def db_test():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        return {
            "database": "Connected Successfully",
            "result": result.scalar()
        }