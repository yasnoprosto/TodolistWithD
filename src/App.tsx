import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ]);
    let [filer, setFilter] = useState<FilterValueType>('all');

    function removeTask(id: number) {
        setTasks(tasks.filter(el => el.id !== id));
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filer === 'completed') {
        tasksForTodolist = tasks.filter(el => el.isDone);
    }
    if (filer === 'active') {
        tasksForTodolist = tasks.filter(el => !el.isDone);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}

            />
        </div>
    );
}

export default App;
