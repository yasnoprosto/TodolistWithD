import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    onChangeStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeTitleHandler: (newTitle: string, id: string) => void
    removeTask: () => void
}

export const Task = (props: TaskPropsType) => {
    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox onChange={props.onChangeStatusHandler} checked={props.task.isDone}/>
        <EditableSpan id={props.task.id} title={props.task.title} onChange={props.onChangeTitleHandler}/>
        <IconButton onClick={props.removeTask}><Delete/> </IconButton>
    </div>;
}