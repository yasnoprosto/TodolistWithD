import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Task} from "./Task";

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

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist render");


    const tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[props.todolistId]);


    const dispatch = useDispatch();

    const addTask = useCallback((title: string) => dispatch(addTaskAC(props.todolistId, title)), [props.changeFilter, props.todolistId]);
    const removeTodolist = useCallback(() => props.removeTodolist(props.todolistId), []);
    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistId, "all"), [props.changeFilter, props.todolistId]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistId, "active"), [props.changeFilter, props.todolistId]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId, "completed"), [props.changeFilter, props.todolistId]);
    const onChangeTitleHandler = useCallback((newTitle: string, id: string) => {
        dispatch(changeTaskTitleAC(
            props.todolistId, id, newTitle));
    }, [props.todolistId, props.changeTodolistTitle]);

    const changeTitleTodolist = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title);
    }, [props.todolistId, props.changeTodolistTitle]);



    let tasksForTodolist = tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }


    return <div>
        <h3><EditableSpan id={props.todolistId} title={props.title} onChange={changeTitleTodolist}/>

            <IconButton onClick={removeTodolist}><Delete/> </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    const removeTask = () => dispatch(removeTaskAC(props.todolistId, t.id));
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(
                            props.todolistId, t.id, newIsDoneValue));
                    };
                    return <Task key={t.id} task={t} onChangeStatusHandler={onChangeStatusHandler} onChangeTitleHandler={onChangeTitleHandler} removeTask={removeTask}/>
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
});



