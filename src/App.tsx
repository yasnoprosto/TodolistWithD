//
//
// import React, {useState} from 'react';
// import './App.css';
// import {TaskType, Todolist} from './Todolist';
// import {v1} from 'uuid';
// import {AddItemForm} from './AddItemForm';
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
// import {Menu} from '@mui/icons-material';
//
// export type FilterValuesType = 'all' | 'active' | 'completed';
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
//
// function App() {
//     const todolistId1 = v1();
//     const todolistId2 = v1();
//
//     const [todolists, setTodolists] = useState<Array<TodolistType>>([
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'}
//     ]);
//
//     const [tasks, setTasks] = useState<TasksStateType>({
//         [todolistId1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: 'Milk', isDone: true},
//             {id: v1(), title: 'React Book', isDone: true}
//         ]
//     });
//
//
//     function removeTask(todolistId: string, id: string) {
//         //достанем нужный массив по todolistId:
//         const todolistTasks = tasks[todolistId];
//         // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
//         tasks[todolistId] = todolistTasks.filter(t => t.id != id);
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     function addTask(todolistId: string, title: string) {
//         const task = {id: v1(), title: title, isDone: false};
//         //достанем нужный массив по todolistId:
//         const todolistTasks = tasks[todolistId];
//         // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
//         tasks[todolistId] = [task, ...todolistTasks];
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     function changeTaskStatus(todolistId: string, id: string, isDone: boolean) {
//         //достанем нужный массив по todolistId:
//         const todolistTasks = tasks[todolistId];
//         // найдём нужную таску:
//         const task = todolistTasks.find(t => t.id === id);
//         //изменим таску, если она нашлась
//         if (task) {
//             task.isDone = isDone;
//             // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//             setTasks({...tasks});
//         }
//     }
//
//     function changeTaskTitle(todolistId: string, id: string, newTitle: string) {
//         //достанем нужный массив по todolistId:
//         const todolistTasks = tasks[todolistId];
//         // найдём нужную таску:
//         const task = todolistTasks.find(t => t.id === id);
//         //изменим таску, если она нашлась
//         if (task) {
//             task.title = newTitle;
//             // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//             setTasks({...tasks});
//         }
//     }
//
//
//
//
//     function changeFilter(todolistId: string, value: FilterValuesType) {
//         const todolist = todolists.find(tl => tl.id === todolistId);
//         if (todolist) {
//             todolist.filter = value;
//             setTodolists([...todolists]);
//         }
//     }
//
//     function changeTodolistTitle(todolistId: string, title: string) {
//         const todolist = todolists.find(tl => tl.id === todolistId);
//         if (todolist) {
//             todolist.title = title;
//             setTodolists([...todolists]);
//         }
//     }
//
//     function removeTodolist(id: string) {
//         // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
//         setTodolists(todolists.filter(tl => tl.id != id));
//         // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
//         delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     const addTodolist = (title: string) => {
//         const newTodolist: TodolistType = {
//             id: v1(),
//             title: title,
//             filter: 'all'
//         };
//         setTodolists([newTodolist, ...todolists]);
//         setTasks({[newTodolist.id]: [], ...tasks});
//     };
//
//
//     return (
//         <div className="App">
//
//
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                     >
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding:"20px"}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={5}>
//                     {
//                         todolists.map(tl => {
//                             const allTodolistTasks = tasks[tl.id];
//                             let tasksForTodolist = allTodolistTasks;
//
//                             if (tl.filter === 'active') {
//                                 tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
//                             }
//                             if (tl.filter === 'completed') {
//                                 tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
//                             }
//
//                             return<Grid item>
//                                 <Paper style={{padding:"20px"}}>
//                                     <Todolist
//                                         key={tl.id}
//                                         id={tl.id}
//                                         title={tl.title}
//                                         tasks={tasksForTodolist}
//                                         removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeTaskStatus={changeTaskStatus}
//                                         filter={tl.filter}
//                                         removeTodolist={removeTodolist}
//                                         changeTaskTitle={changeTaskTitle}
//                                         changeTodolistTitle={changeTodolistTitle}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         })
//                     }
//
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default App;
import {AddTaskActionType} from "./state/tasks-reducer";
