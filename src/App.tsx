import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {


    function removeTask(id: string, todoId: string) {
        let tasks = tasksObj[todoId];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todoId] = filteredTasks;
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todoId: string) {
        let tasks = tasksObj[todoId];
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        tasksObj[todoId] = newTasks;
        setTasksObj({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todoId: string) {
        let tasks = tasksObj[todoId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});

        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(el => el.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    function changeTitleTodolist(title: string, todolistId: string) {
        let todolist = todolists.find(el => el.id === todolistId);
        if (todolist) {
            todolist.title = title;
            setTodolists([...todolists]);
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'Wat to learn', filter: 'all'},
        {id: todolistId2, title: 'Wat to buy', filter: 'all'}
    ]);

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true}
        ]
    });
    let removeTodolist = (todoId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todoId);
        setTodolists(filteredTodolist);
        delete tasksObj[todoId];
        setTasksObj({...tasksObj});
    };
    const addTodolist = (title: string) => {
        let newTodolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        };
        setTodolists([newTodolist, ...todolists]);
        setTasksObj({...tasksObj, [newTodolist.id]: []});
    };
    const changeTaskTitle = (taskId: string, newValue: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newValue;
            setTasksObj({...tasksObj});

        }
    };
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(el => {
                    let tasksForTodolist = tasksObj[el.id];

                    if (el.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (el.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }
                    return (<Todolist key={el.id}
                                      idTodo={el.id}
                                      title={el.title}
                                      tasks={tasksForTodolist}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeTaskStatus={changeStatus}
                                      filter={el.filter}
                                      removeTodolist={removeTodolist}
                                      changeTaskTitle={changeTaskTitle}
                                      changeTitleTodolist={changeTitleTodolist}
                    />);
                }
            )}


        </div>
    );
}

export default App;
