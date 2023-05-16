import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type buttonNameType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTask] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ]);
    let [filter, setFilter] = useState<buttonNameType>('all');

    let filteredTask = tasks;

    if (filter == 'active') {
        filteredTask = tasks.filter(el => !el.isDone);

    } else if (filter == 'completed') {
        filteredTask = tasks.filter(el => el.isDone);

    }

    function clickFilter(ButtonName: buttonNameType) {
        setFilter(ButtonName);
    }

    function removeTask(id: number) {
        setTask(tasks = tasks.filter(el => el.id !== id));
        console.log(tasks);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTask}
                      removeTask={removeTask}
                      clickFilter={clickFilter}
            />
        </div>
    );
}

export default App;
