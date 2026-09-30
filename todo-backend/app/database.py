import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# Load .env variables
load_dotenv()

# Read database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

# Create engine
engine = create_engine(DATABASE_URL)

# Create session factory
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# Base class for models
class Base(DeclarativeBase):
    pass

# Dependency: open/close DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()