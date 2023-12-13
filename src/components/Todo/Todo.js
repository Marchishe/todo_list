import React, { useState } from 'react'
import TodoHeader from "../TodoHeader/TodoHeader";
import TodoActions from "../TodoActions/TodoActions";
import TodoRender from "../TodoRender/TodoRender";
import { v4 as uuidv4 } from 'uuid';
import './Todo.css';

const initialFormData = {
    todoName: '',
    todoNote: '',
    isFinished: false,
    isActive: false,
    isEdit: false,
    id: '',
    index: null
}

const getFinishedTodosCount = (todos) => todos.reduce((acc, curr)=>{
    acc.total = todos.length;

    if(curr.isFinished) {
        acc.finished = acc.finished + 1;
    }

    return acc;

}, { total: 0, finished: 0 } )


const setFilterTab = (tab, todos) => {
    if (tab === 0) {
        return todos;
    } else if (tab === 1) {
        return todos.filter((todo) => !todo.isFinished && !todo.isActive)
    } else if (tab === 2) {
        return todos.filter((todo) => todo.isActive)
    } else if (tab === 3) {
        return todos.filter((todo) => todo.isFinished)
    }
}



function Todo() {
    const [tab, setTab] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDisplayTodo, setIsOpenDisplayTodo] = useState(false);
    const [todos, setTodos] = useState([]);
    const [formData, setFormData] = useState(initialFormData);

    const sortedTodos = setFilterTab(tab, todos);

    const totalCount = getFinishedTodosCount(todos);

    const resetAll = () => {
        setIsOpen(false);
        setIsOpenDisplayTodo(false);
        setFormData(initialFormData);
    }

    const handleOpenDialog = () => setIsOpen((prevState) => !prevState);

    const handleSetFieldValue = (fieldName, value) =>
        setFormData((prevState)=>({...prevState, [fieldName]:value}));

    const handleChangeTab = (tabValue) => setTab(tabValue);

    const handleSetTodoOnSubmit = (e) => {
        e.preventDefault();

        if (formData.isEdit) {
            const editedTodos = todos;
            editedTodos.splice(formData.index, 1, { ...formData, isEdit: false, index: null });
            setTodos(editedTodos);
        } else {
            setTodos((prevState)=>[...prevState, { ...formData, id: uuidv4()}]);
        }

        resetAll();
    }

    const handleMarkFinishedTodo = (isChecked, index) => {
        const updatedTodos = todos.slice();
        updatedTodos.splice(index, 1, {...todos[index],isFinished:isChecked});
        setTodos(updatedTodos);
    }

    const handleMarkActiveTodo = (isChecked, index) => {
        const updatedTodos = todos.slice();
        updatedTodos.splice(index, 1, {...todos[index],isActive:isChecked});
        setTodos(updatedTodos);
    }


    const handleOpenTodo = (todo) => {
        setIsOpenDisplayTodo(true);
        setFormData(todo)
    }

    const handleEditTodo = () => {
        setFormData((prevState) => ({...prevState, isEdit: true}));
        setIsOpenDisplayTodo(false);
        handleOpenDialog();
    }

    const handleRemoveTodo = () => {
        setTodos(todos.filter((item)=>item.id !== formData.id));
        resetAll();
    }

    console.log('todos', todos)


  return (
      <div className='todo-wrapper'>

        <TodoHeader
            handleOpenDialog={handleOpenDialog}
            isOpen={isOpen}
            handleSetFieldValue={handleSetFieldValue}
            formData={formData}
            handleSetTodoOnSubmit={handleSetTodoOnSubmit}
            handleEditTodo={handleEditTodo}
            isOpenDisplayTodo={isOpenDisplayTodo}
            handleRemoveTodo={handleRemoveTodo}
            handleCloseButton={resetAll}
            totalCount={totalCount}
        />

        <TodoActions
            handleChangeTab={handleChangeTab}
            tab={tab}
        />

        <TodoRender
            todos={sortedTodos}
            handleMarkFinishedTodo={handleMarkFinishedTodo}
            handleMarkActiveTodo={handleMarkActiveTodo}
            handleOpenTodo={handleOpenTodo}
        />

      </div>
  );
}

export default Todo;
