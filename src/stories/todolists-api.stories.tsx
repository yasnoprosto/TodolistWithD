import React, {useEffect, useState} from "react";
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
    useEffect(() => {
        const todolistId = "a1f1d8cd-508a-4cf8-be44-85b9f42cb55f";
        const taskId = "cea77693-cef2-4e49-95ed-fe3fe8dc4432";
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "a1f1d8cd-508a-4cf8-be44-85b9f42cb55f";
        const taskId = "60c3cc60-bf76-4009-ab9d-80b92403c6de";
        const newTitle = "Banana";
        todolistsAPI.updateTaskTitle(todolistId, taskId, newTitle)
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};