import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {todolistsAPI} from "../api/todolists-API";

export default {
    title: "API"
};

//todolists

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists().then((res) => {
            setState(res.data);
        });

    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsAPI.createTodolist("What to buy").then((res) => {
            setState(res.data);
        });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "0a69f5eb-792e-468d-b0c0-9a6e42e1bd76";
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "e3cc9d89-ba43-4925-b0db-9264973f1fcf";
        todolistsAPI.updateTodolistTitle(todolistId, "What to think about")
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

//tasks

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todolistId = "a1f1d8cd-508a-4cf8-be44-85b9f42cb55f";
        todolistsAPI.getTasks(todolistId).then((res) => {
            setState(res.data);
        });

    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "a1f1d8cd-508a-4cf8-be44-85b9f42cb55f";
        todolistsAPI.createTask(todolistId, {title: "Avocado"}).then((res) => {
            setState(res.data);
        });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const todolistRef = useRef<HTMLInputElement | null>(null);
    const tasksRef = useRef<HTMLInputElement | null>(null);

    const onClickHandler = () => {
        const todolistId = todolistRef.current?.value;
        const taskId = tasksRef.current?.value;
        if (todolistId && taskId) {
            todolistsAPI.deleteTask(todolistId, taskId)
                .then((res) => {
                    setState(res.data);
                });
        };
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"todolist ID here"} type="text" ref={todolistRef}/>
        <input placeholder={"task ID here"} type="text" ref={tasksRef}/>
        <button onClick={onClickHandler}>DELETE</button>
    </div>;
};
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "a1f1d8cd-508a-4cf8-be44-85b9f42cb55f";
        const taskId = "91d0c280-d6bd-4251-98a3-77b6f6f131d7";
        const newTitle = "Banana";
        todolistsAPI.updateTaskTitle(todolistId, taskId, newTitle)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};