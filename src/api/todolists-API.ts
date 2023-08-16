import axios from "axios";

export const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "73fa3c71-02ba-426b-b365-d2b3e001c404"
    }
};

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
};

type CreateTodolistResponseType = {
    data: {
        item: TodolistType
    }
};

type DeleteTodolistResponseType = {
    data: {}
};

type UpdateTodolistResponseType = {
    data: {}
};


type ResponseType<D> = {
    messages: Array<string>
    resultCode: number
    fieldsErrors: Array<string>
    data: D
}



export const todolistsAPI = {
    getTodolists() {
        return axios.get<Array<TodolistType>>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings);
    },
    createTodolist(title: string) {
        return axios.post<ResponseType<CreateTodolistResponseType>>("https://social-network.samuraijs.com/api/1.1/todo-lists", {title}, settings);
    },
    deleteTodolist(todolistId: string) {
        return axios.delete<ResponseType<DeleteTodolistResponseType>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings);
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return axios.put<ResponseType<UpdateTodolistResponseType>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings);
    }
};