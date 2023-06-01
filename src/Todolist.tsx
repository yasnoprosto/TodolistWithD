import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
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
    addTAsk: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [title, SetTitle] = useState('');

    const OnChangeInputHandler = (even: ChangeEvent<HTMLInputElement>) => {
        SetTitle(even.currentTarget.value);
    };

    const OnClickButtonHandler = (title: string) => {
        props.addTAsk(title);
        SetTitle('');
    };


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        {
            if (e.ctrlKey && e.charCode === 13) {
                OnClickButtonHandler(title);
            }
        }
    };


    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={OnChangeInputHandler}
                   value={title}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={() => OnClickButtonHandler(title)}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id);
                    };

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>;
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>

            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>;
}
