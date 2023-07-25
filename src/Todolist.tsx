import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[props.todolistId]);
    const dispatch = useDispatch();


    const removeTodolist = () => props.removeTodolist(props.todolistId);
    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

    const allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }

    const changeTittleTodolist = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title);
    };

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTittleTodolist}/>

            <IconButton onClick={removeTodolist}><Delete/> </IconButton>
        </h3>
        <AddItemForm addItem={(title) => dispatch(addTaskAC(props.todolistId, title))}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(props.todolistId, t.id));
                    const onChangStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(
                            props.todolistId, t.id, newIsDoneValue));
                    };
                    const onChangeTitleHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(
                            props.todolistId, t.id, newTitle));
                    };

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}><Delete/> </IconButton>
                    </div>;
                })
            }
        </div>
        <div>
            <Button color={"inherit"}
                    variant={props.filter === "all" ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}

                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"error"} variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>;
}

