import axios from "axios";

export const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "73fa3c71-02ba-426b-b365-d2b3e001c404"
    }
};

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

type TodolistAPIType = {
    id: string
    title: string
    addedDate: string
    order: number
};



type TaskAPIType = {
    description: string;
    title: string;
    completed: boolean;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};


type CreateTodolistResponseType = {
    data: {
        item: TodolistAPIType
    }
};

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskAPIType[]
};


type CreateTaskResponseType = {
    data: {
        item: TaskAPIType
    }
};



type ResponseType<D = {}> = {
    messages: Array<string>
    resultCode: number
    fieldsErrors: Array<string>
    data: D
}


export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistAPIType>>("todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<CreateTodolistResponseType>>("todo-lists", {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, task: {
        title: string
    }) {
        return instance.post<ResponseType<CreateTaskResponseType>>(`todo-lists/${todolistId}/tasks`, task);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: newTitle});
    }
};