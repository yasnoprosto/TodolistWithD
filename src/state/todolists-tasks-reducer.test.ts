import {removeAllTasksAC, RemoveAllTasksActionType, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {TasksStateType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";

test("id's should be equal", () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistType[] = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)


    const keys= Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)

});
test("tasks from removed todolist should be deleted", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "HTML&CSS",
                isDone: true
            },
            {
                id: "2",
                title: "JS",
                isDone: false
            },
            {
                id: "3",
                title: "React",
                isDone: true
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "Milk",
                isDone: true
            },
            {
                id: "2",
                title: "React Book",
                isDone: false
            },
            {
                id: "3",
                title: "Apples",
                isDone: true
            }
        ]
    };

    const action: RemoveAllTasksActionType = removeAllTasksAC("todolistId2")

    const endState: TasksStateType = tasksReducer(startState, action)



    expect(Object.keys(endState).length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()


});