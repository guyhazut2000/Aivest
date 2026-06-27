import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import ai

app = FastAPI(title="Aivest API (Python)", version="0.1.0")

_cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000")
allow_origins = [origin.strip() for origin in _cors_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(ai.router)


@app.get("/health")
def health() -> dict[str, str | bool]:
    return {"ok": True, "service": "api-python"}


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Aivest Python API — local dev"}
