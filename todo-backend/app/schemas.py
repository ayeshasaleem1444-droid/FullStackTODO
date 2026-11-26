from pydantic import BaseModel, ConfigDict


# =====Schema1: For creating a todo (what the user sends) =====
class TodoCreate(BaseModel):
    title: str


# =====Schema2: For updating a todo (partial update) =====
class TodoUpdate(BaseModel):
    # it means | that we could add string or nothing at all
    title: str | None = None
    completed: bool | None = None


# ===== For sending back to the user (what the API returns) =====
class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool

    model_config = ConfigDict(from_attributes=True)