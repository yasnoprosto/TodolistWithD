import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
};

export type AddTaskActionType = {
    type: "ADD-TASK"
    todolistId: string
    title: string
};

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskId: string
    newTitle: string
};

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    taskId: string
    isDone: boolean
};

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
};

export type RemoveAllTasksActionType = {
    type: "REMOVE-ALL-TASKS"
    todolistId: string
};

export type TasksActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType | AddTodolistActionType | RemoveAllTasksActionType

const initialState: TasksStateType = {
    count: []
};

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK": {
            // const stateCopy = {...state}
            // stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId);
            // return stateCopy
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].filter(t => t.id !== action.taskId)]
            };
        }
        case "ADD-TASK": {
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            };

            // const stateCopy = {...state}
            // stateCopy[action.todolistId].push(newTask)
            //
            // return stateCopy;
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], newTask]
            };
        }
        case "CHANGE-TASK-STATUS": {
            // const stateCopy = {...state}
            // const todolistTasks = stateCopy[action.todolistId]
            // const mappedTasks = todolistTasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            // stateCopy[action.todolistId] = mappedTasks
            // return stateCopy

            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].map(t =>
                    t.id === action.taskId
                        ? {
                            ...t,
                            isDone: action.isDone
                        }
                        : t)]
            };
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state};
            const todolistTasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                title: action.newTitle
            } : t);
            return stateCopy;
            // return {...state, [action.todolistId]: [...state[action.todolistId].map(t =>
            //     t.id === action.taskId
            //         ? {...t, title: action.newTitle}
            //         : t
            //     )]};
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = []

            return stateCopy
        }
        case "REMOVE-ALL-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            delete  stateCopy[action.todolistId]

            return stateCopy
        }
        default:
            return state
    }
};

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        todolistId: todolistId,
        taskId: taskId
    };
};

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        todolistId: todolistId,
        title: title
    };
};

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        todolistId: todolistId,
        taskId: taskId,
        isDone: isDone
    };
};

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        todolistId: todolistId,
        taskId: taskId,
        newTitle: newTitle
    };
};

export const removeAllTasksAC = (todolistId: string): RemoveAllTasksActionType => {
    return {
        type: "REMOVE-ALL-TASKS",
        todolistId: todolistId
    };
};