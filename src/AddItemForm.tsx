import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';
import {v1} from "uuid";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    };
    const addTask = () => {

        const newTitle = title.trim();
        if (newTitle !== '') {
            props.addItem(newTitle);
            setTitle('');
        } else {
            setError('Title is required');
        }
    };
    return <div style={{padding:"10px"}}>
    <TextField
        variant={"outlined"}
        size={"small"}
        label={"Type value"}
        value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               error={!!error}
        helperText={error}
        />
        {/*<button onClick={addTask}>+</button>*/}
        <IconButton onClick={addTask} color={'info'}>
            <ControlPoint/>
        </IconButton>

    </div>;
};