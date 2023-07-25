import React, {useReducer} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {removeAllTasksAC,} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const dispatch = useDispatch();

    function changeFilter(todolistId: string, value: FilterValuesType) {

        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(todolistId, newTitle);
        dispatch(action);
    }

    function removeTodolist(todolistId: string) {
        const actionTodolists = removeTodolistAC(todolistId);
        const actionTasks = removeAllTasksAC(todolistId);
        dispatch(actionTasks);
        dispatch(actionTodolists);
    }

    const addTodolist = (title: string) => {
        const actionTodolists = addTodolistAC(title);
        dispatch(actionTodolists);
    };


    return (
        <div className="App">


            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((tl, i) => {

                            return <Grid key={i} item>
                                <Paper style={{padding: "20px"}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>;
                        })
                    }

                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;