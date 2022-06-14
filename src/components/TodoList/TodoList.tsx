import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../Button/Button";
import classes from "./TodoList.module.css";
import {NameBtnType} from "../../App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    tasks: Array<TaskType>
    filteredTasks: (valueName: NameBtnType) => void
    removeTask: (taskId: string) => void
    addTask: (valueOnChange: string) => void
    changeCheckBox: (taskId: string, valueChecked: boolean) => void
    nameTasks: string
    nameButton:string

}

export const TodoList = (props: TodoListType) => {

    let [valueOnChange, setValueOnChange] = useState('')
    let [error, setError] = useState<string | null>(null)

    const filteredTasksHandler = (valueFilterTask: NameBtnType) => {
        props.filteredTasks(valueFilterTask)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId)
    }

    const addTaskHandler = () => {
        if (valueOnChange.trim() !== '') {
            props.addTask(valueOnChange.trim())
            setValueOnChange('')
        } else {
            setError('Wrong name')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValueOnChange(event.currentTarget.value)
    }

    const onChangeCheckBoxHandler = (taskId: string, valueChecked: boolean) => {
        props.changeCheckBox(taskId, valueChecked)

    }

    const onkeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            addTaskHandler()
        } else {
            setError(null)
        }
    }

    return (
        <div className={classes.content}>
            <ul>
                <div>
                    <h1>{props.nameTasks}</h1>
                </div>
                <div className={classes.addTask}>
                    <div>
                        <input className={error ? classes.error : ''}
                               onKeyDown={onkeydownHandler}
                               value={valueOnChange}
                               onChange={onChangeHandler}/>
                    </div>
                    <div>
                        <Button name={'+'} callback={addTaskHandler}/>
                    </div>
                </div>
                <div className={error ? classes.errorMessage : ''}>{error}</div>

                {
                    props.tasks.map(el => {
                        return (
                            <li key={el.id} className={classes.myTask}>
                                <div>
                                    <input
                                        onChange={(event) => onChangeCheckBoxHandler(el.id, event.currentTarget.checked)}
                                        type={"checkbox"} checked={el.isDone}/>
                                </div>
                                <div>
                                    <Button name={'X'} callback={() => removeTaskHandler(el.id)}/>
                                </div>
                                <div>
                                    <span>{el.title}</span>
                                </div>
                            </li>
                        )
                    })
                }
                <div className={classes.filteredBtn}>
                    <button className={props.nameButton === 'all' ? classes.buttonActive : ''} onClick={() => filteredTasksHandler('all')}> All </button>
                    <button className={props.nameButton === 'active' ? classes.buttonActive : ''} onClick={() => filteredTasksHandler('active')}> Active </button>
                    <button className={props.nameButton === 'completed' ? classes.buttonActive : ''} onClick={() => filteredTasksHandler('completed')}> Completed </button>
                </div>
            </ul>

        </div>
    );
};

