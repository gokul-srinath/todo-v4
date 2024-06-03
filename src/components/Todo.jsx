import React from "react";
import "./todos.css";
const Todo = ({ todo, toggleMark, deleteHandler }) => {
  return (
    <div className={"todo" + (todo.completed ? " completed" : "")}>
      <div
        className="delete"
        title="delete"
        onClick={() => deleteHandler(todo)}
      >
        &times;
      </div>
      <h4>{todo.task}</h4>
      <button onClick={() => toggleMark(todo)}>
        {todo.completed ? "mark as uncompleted" : "mark as completed"}
      </button>
    </div>
  );
};

export default Todo;
