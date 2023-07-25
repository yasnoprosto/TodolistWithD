import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    onChange:(title:string)=>void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");


    const onDoubleClickHandler = () => {
        setEditMode(true)
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField   size={"small"} value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>;
};