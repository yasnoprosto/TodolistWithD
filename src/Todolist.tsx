import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    idTodo: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue:string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTitleTodolist:(title: string, todolistId: string)=>void

}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.idTodo);
    const onActiveClickHandler = () => props.changeFilter('active', props.idTodo);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.idTodo);
    const onClickRemoveTodo = () => {
        props.removeTodolist(props.idTodo);
    };
    const addTask = (title: string) => {
        props.addTask(title, props.idTodo);
    };
    const changeTitleTodolistHandler=(newTitle:string)=>{
        props.changeTitleTodolist(newTitle,props.idTodo)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTitleTodolistHandler}/>
            <button onClick={onClickRemoveTodo}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.idTodo);
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.idTodo);
                    }
                    ;const onChangeTitleHandler = (newValue:string) => {
                       props.changeTaskTitle(t.id, newValue, props.idTodo);
                    };

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeStatusHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>;
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>;
}

