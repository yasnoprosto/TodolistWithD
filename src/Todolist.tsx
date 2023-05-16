import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {buttonNameType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    clickFilter: (buttonName: buttonNameType) => void
    addTask: (title: string) => void
}


export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    };

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    };
    const onAllClickHandler = () => props.clickFilter('all');
    const onActiveClickHandler = () => props.clickFilter('active');
    const onCompletedClickHandler = () => props.clickFilter('completed');


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {props.tasks.map((el) => {
               const onRemoveHandler=()=>{props.removeTask(el.id)}
                return <li key={el.id}>
                    <input type="checkbox" checked={el.isDone}/>
                <span><button onClick={onRemoveHandler}>X</button>
                    {el.title}</span></li>})
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>;
}


