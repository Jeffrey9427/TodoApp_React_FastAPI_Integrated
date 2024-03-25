from fastapi import FastAPI, Path
from typing import Optional
from pydantic import BaseModel
from uuid import UUID, uuid4
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

todos = {}

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Todos(BaseModel):
    title: str
    id: UUID
    completed: bool = False


class UpdateTodo(BaseModel):
    title: Optional[str] = None
    id: Optional[UUID] = None
    completed: Optional[bool] = None


@app.get("/")
def index():
    return {"message": "Welcome to a todolist example of FastAPI!"}

# Get all todos


@app.get("/get-todos")
def get_todos():
    return list(todos.values())

# Path parameter (decorator parameter + function parameter) - get todo by id


@app.get("/get-todo/{todo_id}")
def get_todo_by_id(todo_id: UUID = Path(..., description="The ID of the todo")):
    if todo_id not in todos:
        return {"Error": f"Todo ID {todo_id} not found."}
    return todos[todo_id]

# Query parameters (solely function parameters) - get todo by title


@app.get("/get-todo-by-title")  # ?title=
def get_todo_by_title(title: str):
    for todo_id in todos:
        if todos[todo_id].title == title:
            return todos[todo_id]
    return {"Error": f"Todo name '{title}' not found."}

# Combining path and query - get todo by id and title


@app.get("/get-todo-by-title-and-id")
def get_todos_by_title_id(*, todo_id: UUID, title: Optional[str] = None):
    for todo_id in todos:
        if todos[todo_id].title == title:
            return todos[todo_id]
    return {"Error": f"Todo name '{title}' not found."}

# Get completed todos


@app.get("/todos/completed")
def get_completed_todos():
    completed_todos = [todos[todo_id]
                       for todo_id in todos if todos[todo_id].completed]
    if not completed_todos:
        return {"message": "No completed todos."}
    return completed_todos

# Get not completed todos


@app.get("/todos/not-completed")
def get_not_completed_todos():
    not_completed_todos = [todos[todo_id]
                           for todo_id in todos if not todos[todo_id].completed]
    if not not_completed_todos:
        return {"message": "All todos are completed."}
    return not_completed_todos

# Post student (create new Todo object in todos list)


@app.post("/create-todo/")
def create_todo(todo: Todos) -> dict:
    # todo.id = len(todos)  # Assign the length of todos as the todo_id
    # todos[len(todos)] = todo
    todos[todo.id] = todo
    return todo

# Update todos


@app.put("/todos/update-todo/{todo_id}")
def update_todo(todo_id: UUID, todo: UpdateTodo):
    if todo_id not in todos:
        return {"Error": f"Todo ID {todo_id} does not exist."}

    if todo.title != None:
        todos[todo_id].title = todo.title
    if todo.id != None:
        todos[todo_id].id = todo.id
    if todo.completed != None:
        todos[todo_id].completed = todo.completed

    return todos[todo_id]

# Delete todos by id


@app.delete("/delete-todo/{todo_id}")
def delete_todo(todo_id: UUID):
    if todo_id not in todos:
        return {"Error": f"Todo ID {todo_id} does not exist."}

    del todos[todo_id]
    return {"message": "Todo deleted successfully."}

# Delete todos by title


@app.delete("/delete-todo-by-title/{title}")
def delete_todo_by_title(title: str):
    deleted_count = 0
    for todo_id, todo in list(todos.items()):
        if todo.title == title:
            del todos[todo_id]
            deleted_count += 1
    if deleted_count == 0:
        return {"message": f"No todos with title '{title}' found."}
    return {"message": f"{deleted_count} todos with title '{title}' deleted successfully."}

# Delete all todos


@app.delete("/delete-all-todos")
def delete_all_todos():
    todos.clear()
    return {"message": "All todos deleted successfully."}
