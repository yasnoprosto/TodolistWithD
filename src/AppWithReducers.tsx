// import React, {useReducer} from "react";
// import "./App.css";
// import {TaskType, Todolist} from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
// import {Menu} from "@mui/icons-material";
// import {
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer
// } from "./state/todolists-reducer";
// import {
//     addTaskAC,
//     addTodolistAC,
//     changeTaskStatusAC,
//     changeTaskTitleAC, removeAllTasksAC,
//     removeTaskAC,
//     tasksReducer
// } from "./state/tasks-reducer";
//
// export type FilterValuesType = "all" | "active" | "completed";
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
// function AppWithReducers() {
//     const todolistId1 = v1();
//     const todolistId2 = v1();
//
//     const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
//         {
//             id: todolistId1,
//             title: "What to learn",
//             filter: "all"
//         },
//         {
//             id: todolistId2,
//             title: "What to buy",
//             filter: "all"
//         }
//     ]);
//
//     const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
//         [todolistId1]: [
//             {
//                 id: v1(),
//                 title: "HTML&CSS",
//                 isDone: true
//             },
//             {
//                 id: v1(),
//                 title: "JS",
//                 isDone: true
//             }
//         ],
//         [todolistId2]: [
//             {
//                 id: v1(),
//                 title: "Milk",
//                 isDone: true
//             },
//             {
//                 id: v1(),
//                 title: "React Book",
//                 isDone: true
//             }
//         ]
//     });
//
//
//     function removeTask(todolistId: string, taskId: string) {
//         const action = removeTaskAC(todolistId, taskId);
//         dispatchToTasksReducer(action);
//     }
//
//     function addTask(todolistId: string, title: string) {
//         const action = addTaskAC(todolistId, title);
//         dispatchToTasksReducer(action);
//     }
//
//     function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
//         const action = changeTaskStatusAC(todolistId, taskId, isDone);
//         dispatchToTasksReducer(action);
//     }
//
//     function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
//         const action = changeTaskTitleAC(todolistId, taskId, newTitle);
//         dispatchToTasksReducer(action);
//     }
//
//
//     function changeFilter(todolistId: string, value: FilterValuesType) {
//         const action = changeTodolistFilterAC(todolistId, value);
//         dispatchToTodolistsReducer(action);
//     }
//
//     function changeTodolistTitle(todolistId: string, newTitle: string) {
//         const action = changeTodolistTitleAC(todolistId, newTitle);
//         dispatchToTodolistsReducer(action);
//     }
//
//     function removeTodolist(todolistId: string) {
//         const actionTodolists = removeTodolistAC(todolistId);
//         const actionTasks = removeAllTasksAC(todolistId);
//         dispatchToTasksReducer(actionTasks);
//         dispatchToTodolistsReducer(actionTodolists);
//     }
//
//     const addTodolist = (title: string) => {
//         const action = addTodolistAC(title);
//         dispatchToTodolistsReducer(action);
//         dispatchToTasksReducer(action);
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
//                 <Grid container style={{padding: "20px"}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={5}>
//                     {
//                         todolists.map(tl => {
//                             const allTodolistTasks = tasks[tl.id];
//                             let tasksForTodolist = allTodolistTasks;
//
//                             if (tl.filter === "active") {
//                                 tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
//                             }
//                             if (tl.filter === "completed") {
//                                 tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
//                             }
//
//                             return <Grid item>
//                                 <Paper style={{padding: "20px"}}>
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
//                             </Grid>;
//                         })
//                     }
//
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
export default {};