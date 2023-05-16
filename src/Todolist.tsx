import React from 'react';
import {buttonNameType} from './App';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    clickFilter:(buttonName:buttonNameType)=>void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((el) => <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                <span><button onClick={() => props.removeTask(el.id)}>X</button>

                    {el.title}</span></li>)}
            {/*
            <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
            <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
            <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
        </ul>
        <div>
            <button onClick={() => props.clickFilter('all')}>All</button>
            <button onClick={() => props.clickFilter('active')}>Active</button>
            <button onClick={() => props.clickFilter('completed')}>Completed</button>
        </div>
    </div>;
}


