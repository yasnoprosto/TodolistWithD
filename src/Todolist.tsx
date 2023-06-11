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
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('');

    const OnClickButtonHandler = () => {
        props.addTask(title);
        setTitle('');
    };
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            props.addTask(title);
            setTitle('');
        }
    };

    const onButtonFilterTasks = (buttonName: FilterValuesType) => {
        props.changeFilter(buttonName);
    };
    const removeTask = (t: TaskType) => {
        props.removeTask(t.id);
    };

    const tasks = props.tasks.map(t => <li key={t.id}>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={() => removeTask(t)}>x</button>
    </li>);

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeInputHandler} onKeyPress={onKeyPressInputHandler}/>
            <button onClick={OnClickButtonHandler}>+</button>
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
            <button onClick={() => onButtonFilterTasks('all')}>All</button>
            <button onClick={() => onButtonFilterTasks('active')}>Active</button>
            <button onClick={() => onButtonFilterTasks('completed')}>Completed</button>
        </div>
    </div>;
}
