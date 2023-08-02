import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';
import {TaskType} from "./Todolist";

type EditableSpanPropsType = {
    id: string
    title: string
    onChange:(title:string, id: string)=>void
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("EditableSpan rendering");
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");


    const onDoubleClickHandler = () => {
        setEditMode(true)
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title, props.id)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField   size={"small"} value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>;
});