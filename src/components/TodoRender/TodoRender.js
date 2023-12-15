import React from 'react'
import {pink} from "@mui/material/colors";
import {green} from "@mui/material/colors";
import Checkbox from '@mui/material/Checkbox';
import './TodoRender.css';




const Todo = (
    {
        todo,
        handleMarkFinishedTodo,
        handleMarkActiveTodo,
        index,
        handleOpenTodo
    }
) =>{

    return(
        <div className='todo-container'>

            <span>
                <Checkbox color="success" sx={{color: green[800]}}
                          onClick={(e)=> handleMarkActiveTodo(e.target.checked, todo.id)}
                          checked={todo.isActive}/>
            </span>

            <span>
                <Checkbox
                    color="secondary"
                    sx={{
                        color: pink[800],
                    }}
                    onClick={(e)=>handleMarkFinishedTodo(e.target.checked, todo.id)}
                    checked={todo.isFinished}
                />
            </span>
            <div className='todo-item' onClick={()=>handleOpenTodo({ ...todo, index })}>
                <span>{todo.todoName}</span>
            </div>
        </div>
    )
}


function TodoRender({todos, handleMarkFinishedTodo, handleMarkActiveTodo, handleOpenTodo}) {
    return (
        <div className='todos-renderer-wrapper'>
            {todos.map((todo, index)=>(
                <Todo
                    key={todos.id}
                    todo={todo}
                    handleMarkActiveTodo={handleMarkActiveTodo}
                    handleMarkFinishedTodo={handleMarkFinishedTodo}
                    index={index}
                    handleOpenTodo={handleOpenTodo}
                />
            ))}
        </div>
    );
}

export default TodoRender;