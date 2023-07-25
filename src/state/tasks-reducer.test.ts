import {
    addTaskAC,
    AddTaskActionType, AddTodolistActionType, changeTaskStatusAC, ChangeTaskStatusActionType,
    changeTaskTitleAC, ChangeTaskTitleActionType,
    removeTaskAC,
    RemoveTaskActionType,
    tasksReducer
} from "./tasks-reducer";
import {v1} from "uuid";
import {addTodolistAC} from "./todolists-reducer";


test("correct task should be removed", () => {
    const startState = {
        "todolistId1": [
            {
                id: "1",
                title: "HTML&CSS",
                isDone: true
            },
            {
                id: "2",
                title: "JS",
                isDone: true
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
                isDone: true
            },
            {
                id: "3",
                title: "Apples",
                isDone: true
            }
        ]
    };

    const action: RemoveTaskActionType = removeTaskAC("todolistId1", "1");
    const endState = tasksReducer(startState, action);


    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"].every(t => t.id !== "1")).toBeTruthy();
});

test("task should be added", () => {
    const startState = {
        "todolistId1": [
            {
                id: "1",
                title: "HTML&CSS",
                isDone: true
            },
            {
                id: "2",
                title: "JS",
                isDone: true
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
                isDone: true
            },
            {
                id: "3",
                title: "Apples",
                isDone: true
            }
        ]
    };

    const action: AddTaskActionType = addTaskAC("todolistId1", "Redux");
    const endState = tasksReducer(startState, action);


    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][3].id).toBeDefined();
    expect(endState["todolistId1"][3].title).toBe("Redux");

});

test("task status should be changed", () => {
    const startState = {
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

    const action: ChangeTaskStatusActionType = changeTaskStatusAC("todolistId1", "2", true);
    const endState = tasksReducer(startState, action);


    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][1].isDone).toBe(true);
    expect(endState["todolistId2"][1].isDone).toBe(false);

});

test("task title should be changed", () => {
    const startState = {
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

    const action: ChangeTaskTitleActionType = changeTaskTitleAC("todolistId1", "2", "TS");
    const endState = tasksReducer(startState, action);


    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][1].title).toBe("TS");
    expect(endState["todolistId2"][1].title).toBe("React Book");

});

test("new todolist should be created", () => {
    const startState = {
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

    const action: AddTodolistActionType = addTodolistAC("new todolist");
    const endState = tasksReducer(startState, action);


    expect(Object.keys(endState).length).toBe(3);

});