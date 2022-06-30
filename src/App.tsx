import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TaskType, TodoList} from "./components/TodoList/TodoList";

export type NameBtnType = 'all' | 'completed' | 'active';

type TodoListType = {
    id: string,
    title: string,
    filter: NameBtnType
}

type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoList, setTodoList] = useState<Array<TodoListType>>([ // тудушки
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What a buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({ // таски для туду
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
    })

    const filteredTasks = (todoListID: string, valueName: NameBtnType) => {
        setTodoList(todoList.map(el => el.id === todoListID ? {...el, filter: valueName} : el))
    }

    const removeTask = (todoListID: string, taskId: string) => {
        setTasks({...tasks,[todoListID]: tasks[todoListID].filter(el => el.id !== taskId)})
    }

    const addTask = (todoListID: string, title: string) => {
        let newTask:TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]:[newTask, ...tasks[todoListID]]})
    }

    const changeCheckBox = (todoListID: string, taskId: string, valueChecked: boolean) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: valueChecked} : el)
        })
    }

    const components = todoList.map(el => {

        let copyTasks = tasks[el.id]

        if (el.filter === 'active') {
            copyTasks = tasks[el.id].filter(el => el.isDone === false)
        }

        if (el.filter === 'completed') {
            copyTasks = tasks[el.id].filter(el => el.isDone === true)
        }

        return (
            <TodoList
                key={el.id}
                title={el.title}
                nameButton={el.filter}
                changeCheckBox={changeCheckBox}
                addTask={addTask}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
                tasks={copyTasks}
                todoListID={el.id}
            />
        )
    })


    return (
        <div className='App-header'>
            {components}
        </div>
    );
}

export default App;
