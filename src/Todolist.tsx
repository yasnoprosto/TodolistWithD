import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('');
    const OnClockButtonHandler = () => {
        props.addTask(title);
        setTitle('');
    };
    const OnChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };
    const OnKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.charCode === 13) {
            OnClockButtonHandler();
        }
    };

    const onButtonAll = () => props.changeFilter('all');
    const onButtonActive = () => props.changeFilter('active');
    const onButtonCompleted = () => props.changeFilter('completed');

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={OnChangeInputHandler} onKeyPress={OnKeyPressHandler}/>
            <button onClick={OnClockButtonHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveTask = () => {
                        props.removeTask(t.id);
                    };
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveTask}>x</button>
                    </li>;
                })
            }
        </ul>
        <div>
            <button onClick={onButtonAll}>All</button>
            <button onClick={onButtonActive}>Active</button>
            <button onClick={onButtonCompleted}>Completed</button>
        </div>
    </div>;
}
