import React from "react";
import { pink } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

import { TASK_STATUSES } from "../../constants";
import "./TodoRender.css";

const Todo = ({ todo, handleChangeStatus, handleOpenTodo }) => {
  return (
    <div className="todo-container">
      <span>
        <Checkbox
          color="success"
          sx={{
            color: green[800],
          }}
          onClick={() =>
            handleChangeStatus(TASK_STATUSES.isActive, todo.id, {
              timeEdited: new Date(),
              timeFinished: "",
            })
          }
          checked={todo.status === TASK_STATUSES.isActive}
        />
      </span>

      <span>
        <Checkbox
          color="secondary"
          sx={{
            color: pink[800],
          }}
          onClick={() =>
            handleChangeStatus(TASK_STATUSES.isFinished, todo.id, {
              timeFinished: new Date(),
            })
          }
          checked={todo.status === TASK_STATUSES.isFinished}
        />
      </span>
      <div className="todo-item" onClick={() => handleOpenTodo({ ...todo })}>
        <span>{todo.todoName}</span>
      </div>
    </div>
  );
};

function TodoRender({ todos, handleChangeStatus, handleOpenTodo }) {
  return (
    <div className="todos-renderer-wrapper">
      {todos.map((todo) => (
        <Todo
          key={todos.id}
          todo={todo}
          handleChangeStatus={handleChangeStatus}
          handleOpenTodo={handleOpenTodo}
        />
      ))}
    </div>
  );
}

export default TodoRender;
