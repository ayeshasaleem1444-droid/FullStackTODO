from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app import models, routers

# Create all tables in PostgreSQL (if they don't exist)
Base.metadata.create_all(bind=engine)

# Create the FastAPI app
app = FastAPI(
    title="Todo API",
    description="A simple Todo API built with FastAPI and PostgreSQL",
    version="1.0.0",
)

# ===== CORS: allow the frontend to talk to this backend =====
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== Include the todos router =====
app.include_router(routers.router)


# ===== Root endpoint (just for testing) =====
@app.get("/")
def root():
    return {"message": "Todo API is running 🚀", "docs": "/docs"}