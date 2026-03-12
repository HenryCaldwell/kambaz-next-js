"use client";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodos } from "./context";

export default function ReactContextTodoList() {
  const { todos, todo, addTodo, deleteTodo, updateTodo, setTodo } = useTodos()!;

  return (
    <div id="wd-todo-list-context">
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem>
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <Button
            onClick={updateTodo}
            className="btn btn-warning me-2 mt-2"
            id="wd-update-todo-click"
          >
            Update
          </Button>
          <Button
            onClick={addTodo}
            className="btn btn-success mt-2"
            id="wd-add-todo-click"
          >
            Add
          </Button>
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem
            key={t.id}
            className="d-flex justify-content-between align-items-center"
          >
            <span>{t.title}</span>
            <div>
              <Button
                onClick={() => setTodo(t)}
                className="btn btn-primary me-2"
                id="wd-set-todo-click"
              >
                Edit
              </Button>
              <Button
                onClick={() => deleteTodo(t.id)}
                className="btn btn-danger"
                id="wd-delete-todo-click"
              >
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
