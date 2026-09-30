from sqlalchemy.orm import Session
from app import models, schemas


# ===== GET all todos =====
def get_todos(db: Session):
    return db.query(models.Todo).all()


# ===== GET one todo by id =====
def get_todo(db: Session, todo_id: int):
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()


# ===== CREATE a new todo =====
def create_todo(db: Session, todo: schemas.TodoCreate):
    db_todo = models.Todo(title=todo.title)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


# ===== UPDATE a todo =====
def update_todo(db: Session, todo_id: int, todo_update: schemas.TodoUpdate):
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return None

    # Only update fields that were actually provided
    update_data = todo_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_todo, key, value)

    db.commit()
    db.refresh(db_todo)
    return db_todo


# ===== DELETE a todo =====
def delete_todo(db: Session, todo_id: int):
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return None

    db.delete(db_todo)
    db.commit()
    return db_todo