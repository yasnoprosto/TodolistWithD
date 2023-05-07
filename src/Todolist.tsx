import {FilterValuesType} from './App';

type TodoListPropsType = {
    title: string,
    tasks: TaskType[];
    removeTask: (id:number)=>void
    changeFilter: (value:FilterValuesType)=>void
};
export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
};

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => <li>
                    <input type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                    <button onClick={() => {
                        props.removeTask(el.id);
                    }}>X
                    </button>
                </li>)}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter("active")}}>Active</button>
                <button onClick={()=>{props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;
