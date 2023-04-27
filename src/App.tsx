import React from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

let tasks1: Array<TaskType> = [
  { id: 1, title: "CSS", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "React", isDone: false },
];

let tasks2: Array<TaskType> = [
  { id: 1, title: "Terminator", isDone: true },
  { id: 2, title: "XXX", isDone: false },
  { id: 3, title: "Jentlments of fortune", isDone: true },
];

function App() {
  debugger;
  return (
    <div>
      <Todolist title="What to learn?" tasks={tasks1} />
      <Todolist title="Movies" tasks={tasks2} />
    </div>
  );
}

export default App;
