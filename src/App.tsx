import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./components/TodoList/TodoList";

export type NameBtnType = 'all' | 'completed' | 'active';

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "RestAPI", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    let [nameButton, setNameButton] = useState<NameBtnType>('all')

    let copyTasks = tasks

    if (nameButton === 'active') {
        copyTasks = copyTasks.filter(el => el.isDone === false)
    }

    if (nameButton === 'completed') {
        copyTasks = copyTasks.filter(el => el.isDone === true)
    }

    const filteredTasks = (valueName: NameBtnType) => {
        setNameButton(valueName)
    }

    const removeTask = (taskId: string) => {
        setTasks(copyTasks.filter(el => el.id !== taskId))
    }

    const addTask = (valueOnChange: string) => {
        let newTask = {
            id: v1(),
            title: valueOnChange,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeCheckBox = (taskId: string, valueChecked: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: valueChecked} : el))
    }

    return (
        <div className='App-header'>
            <TodoList
                nameButton={nameButton}
                changeCheckBox={changeCheckBox}
                addTask={addTask}
                removeTask={removeTask}
                filteredTasks={filteredTasks}
                nameTasks={'My tasks:'}
                tasks={copyTasks}/>
        </div>
    );
}

export default App;
