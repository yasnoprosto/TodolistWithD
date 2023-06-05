import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type buttonNameType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTask] = useState<Array<TaskType>>([

        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
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

    function removeTask(id: string) {
        setTask(tasks = tasks.filter(el => el.id !== id));
        console.log(tasks);
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTask(newTasks);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTask}
                      removeTask={removeTask}
                      clickFilter={clickFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
