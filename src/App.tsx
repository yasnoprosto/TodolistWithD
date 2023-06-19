import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObg[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObg[todolistId] = filteredTasks;
        setTasksObg({...tasksObg});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObg[todolistId]
        let newTasks=[task, ...tasks]
        tasksObg[todolistId]=newTasks

        setTasksObg({...tasksObg});
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {

        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolist([...todolists]);
        }

    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObg[todolistId]
        let task = tasks.find(el => el.id === taskId);
        if (task) {
            task.isDone = isDone;
        setTasksObg({...tasksObg});
        }
    };

    let todolistId1 = v1();
    let todolistId2 = v1();

    let removeTodolist=(todolistId:string)=>{
let filteredTodolist=todolists.filter(el=>el.id!==todolistId)
        setTodolist(filteredTodolist)
        delete tasksObg[todolistId]
        setTasksObg(tasksObg)

    }


    let [todolists, setTodolist] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'},
    ]);
    let [tasksObg, setTasksObg] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],

        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ],

    });
    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasksObg[tl.id];

                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }

                    return <  Todolist
                        key={tl.id}
                        title={tl.title}
                        id={tl.id}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />;
                })
            }
        </div>
    );
}

export default App;
