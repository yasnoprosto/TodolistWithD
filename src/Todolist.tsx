import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTitleStatus: (id: string, title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTitleTodolist: (title: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {


    const removeTodolist = () => props.removeTodolist(props.id);

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    };
    const changeTittleTodolist = (title: string) => {
        props.changeTitleTodolist(title, props.id);
    };
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTittleTodolist}/>

            <IconButton onClick={removeTodolist}><Delete/> </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id);
                    const onChangStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    };
                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTitleStatus(t.id, newTitle, props.id);
                    };

                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox  onChange={onChangStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}><Delete/> </IconButton>
                    </div>;
                })
            }
        </div>
        <div>
            <Button color={"inherit"}
                variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}

                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'error'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>;
}

