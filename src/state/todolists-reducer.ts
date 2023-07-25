import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";
import {RemoveAllTasksActionType} from "./tasks-reducer";


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todolistId: string
};

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
};

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
};

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
};

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType | RemoveAllTasksActionType

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodolistType> = []


export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): TodolistType[] => {

    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistId);
        }
        case "ADD-TODOLIST": {
            const newTodolist = {
                id: action.todolistId,
                title: action.title,
                filter: "all" as const
            };
            return [newTodolist, ...state];
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {
                ...tl,
                title: action.title
            } : tl);
        }
        case "CHANGE-TODOLIST-FILTER": {

            return state.map(tl => tl.id === action.id ? {
                ...tl,
                filter: action.filter
            } : tl);
        }
        default:
            return state
    }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId: todolistId
    };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todolistId: v1()
    };
};

export const changeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId,
        title: newTitle
    };
};

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType): ChangeTodolistFilterActionType => {

    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId,
        filter: newFilter
    };
};