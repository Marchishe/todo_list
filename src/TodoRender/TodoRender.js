import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Checkbox from '@mui/material/Checkbox';
import './TodoRender.css';



const Todo = (
    {
        todo,
        handleMarkTodo,
        index,
        handleOpenTodo
    }
) =>{

    const isFinishedTodo = todo.isFinished && 'todo-finished'

    return(
        <div className='todo-container'>
            <span>
                <Checkbox
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleOutlineIcon />}
                    onClick={(e)=>handleMarkTodo(e.target.checked, index)}
                    checked={todo.isFinished}
                />
            </span>

            <div className='todo-item' onClick={()=>handleOpenTodo({ ...todo, index })}>
                <span className={isFinishedTodo}>{todo.todoName}</span>
                <ArrowForwardIosIcon fontSize='small'/>
            </div>
        </div>
    )
}


function TodoRender({todos, handleMarkTodo, handleOpenTodo}) {
    return (
        <div className='todos-renderer-wrapper'>
            {todos.map((todo, index)=>(
                <Todo
                    key={todos.id}
                    todo={todo}
                    handleMarkTodo={handleMarkTodo}
                    index={index}
                    handleOpenTodo={handleOpenTodo}
                />
            ))}
        </div>
    );
}

export default TodoRender;