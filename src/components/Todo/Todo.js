import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import TodoHeader from "../TodoHeader/TodoHeader";
import TodoActions from "../TodoActions/TodoActions";
import TodoRender from "../TodoRender/TodoRender";

import { TASK_STATUSES } from '../../constants';
import './Todo.css';

const initialFormData = {
    todoName: '',
    todoNote: '',
    status: TASK_STATUSES.isReady,
    isEdit: false,
    timeCreated: new Date(),
    timeEdited: '',
    timeFinished: '',
    id: '',
}

const getFinishedTodosCount = (todos) => todos.reduce((acc, curr) => {
    acc.total = todos.length;

    if (curr.status === TASK_STATUSES.isFinished) {
        acc.finished = acc.finished + 1;
    }

    return acc;

}, { total: 0, finished: 0 })

const setFilterTab = (tab, todos) => {
    if (tab === 0) {
        return todos.filter((todo) => todo.status === TASK_STATUSES.isReady);
    } else if (tab === 1) {
        return todos.filter((todo) => todo.status === TASK_STATUSES.isActive);
    } else if (tab === 2) {
        return todos.filter((todo) => todo.status === TASK_STATUSES.isFinished);
    }
}

function Todo() {
    const [tab, setTab] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDisplayTodo, setIsOpenDisplayTodo] = useState(false);
    const [todos, setTodos] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
    const [formData, setFormData] = useState(initialFormData);

    const sortedTodos = setFilterTab(tab, todos);

    const totalCount = getFinishedTodosCount(todos);

    useEffect(()=> {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);

    useEffect(() => {
        window.addEventListener("DOMContentLoaded", event => {
            const audio = document.querySelector("audio");
            audio.volume = 2;
            audio.play();
          });
    })


    const resetAll = () => {
        setIsOpen(false);
        setIsOpenDisplayTodo(false);
        setFormData(initialFormData); 
    }

    const handleOpenDialog = () => setIsOpen((prevState) => !prevState);

    const handleSetFieldValue = (fieldName, value) =>
        setFormData((prevState) => ({ ...prevState, [fieldName]: value }));

    const handleChangeTab = (tabValue) => setTab(tabValue);

    const handleSetTodoOnSubmit = (e) => {
        e.preventDefault();
        if (formData.isEdit) {
            const editedTodos = todos;
            editedTodos.splice(formData.id, 1, { ...formData, isEdit: false, id: uuidv4() });
            setTodos(editedTodos);
        } else {
            setTodos((prevTodos) => [...prevTodos, { ...formData, id: uuidv4() }]);
        }

        resetAll();
    }

    const handleChangeStatus = (status, ID, editDates) => {
        const updatedTodos = todos.slice();
        const index = todos.findIndex(elem => elem.id === ID);

        if (todos[index].status === status) {
            status = TASK_STATUSES.isReady
            editDates = {timeEdited: '', timeFinished: ''}
        }

        updatedTodos.splice(index, 1, { ...todos[index], status, ...editDates});
        setTodos(updatedTodos);
    }

    const handleOpenTodo = (todo) => {
        setIsOpenDisplayTodo(true);
        setFormData(todo)
    }

    const handleEditTodo = () => {
        setFormData((prevState) => ({ ...prevState, isEdit: true }));
        setIsOpenDisplayTodo(false);
        handleOpenDialog();
    }

    const handleRemoveTodo = () => {
        setTodos(todos.filter((item) => item.id !== formData.id));
        resetAll();

    }
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
                handleChangeStatus={handleChangeStatus}
                handleOpenTodo={handleOpenTodo}
            />

        </div>
    );
}

export default Todo;
