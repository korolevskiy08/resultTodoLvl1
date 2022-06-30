import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../Button/Button";
import classes from "./TodoList.module.css";
import {NameBtnType} from "../../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    tasks: Array<TaskType>
    filteredTasks: (todoListID: string, valueName: NameBtnType) => void
    removeTask: (todoListID: string, taskId: string) => void
    addTask: (todoListID: string, title: string) => void
    changeCheckBox: (todoListID: string, taskId: string, valueChecked: boolean) => void
    title: string
    nameButton:string
    todoListID:string
}

export const TodoList = (props: TodoListType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const filteredTasksHandler = (valueFilterTask: NameBtnType) => {
        props.filteredTasks(props.todoListID, valueFilterTask)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(props.todoListID, taskId)
    }

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.todoListID, title.trim())
            setTitle('')
        } else {
            setError('Wrong name')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onChangeCheckBoxHandler = (todoListID: string, taskId: string, valueChecked: boolean) => {
        props.changeCheckBox(todoListID, taskId, valueChecked)
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
                    <h1>{props.title}</h1>
                </div>
                <div className={classes.addTask}>
                    <div>
                        <input className={error ? classes.error : ''}
                               onKeyDown={onkeydownHandler}
                               value={title}
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
                                        onChange={(event) => onChangeCheckBoxHandler(props.todoListID, el.id, event.currentTarget.checked)}
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

