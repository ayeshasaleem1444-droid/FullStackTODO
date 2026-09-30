from pydantic import BaseModel, ConfigDict


# ===== For creating a todo (what the user sends) =====
class TodoCreate(BaseModel):
    title: str


# ===== For updating a todo (partial update) =====
class TodoUpdate(BaseModel):
    title: str | None = None
    completed: bool | None = None


# ===== For sending back to the user (what the API returns) =====
class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool

    model_config = ConfigDict(from_attributes=True)