import PropTypes from 'prop-types'
import { useState } from 'react'

import './task-input.css'

const TaskInput = (props) => {

  const {getNewTask} = props
  const [ task, setTask ] = useState('')
  const [ minutes, setMinutes ] = useState('')
  const [ seconds, setSeconds ] = useState('')

  function keyDown(e) {
    if (e.key === 'Enter' && task.length > 0) {
      if (Number(minutes) >= 0 && Number(seconds) >= 0) {
        getNewTask(task, minutes, seconds)
        setTask('')
      } else {
        alert('Вы ввели некорректные данные!\nПоля Min и Sec должны содержать цифры.')
      }
      setMinutes('')
      setSeconds('')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit} >
        <input 
          name="task" 
          className="new-todo" 
          placeholder="Task" 
          onChange={(e) => setTask(e.target.value)} 
          onKeyDown={keyDown} 
          autoComplete="off"
          value={task}/>
        <input 
          name="minutes" 
          className="new-todo-form__timer" 
          placeholder="Min" 
          onChange={(e) => setMinutes(e.target.value)} 
          onKeyDown={keyDown} 
          autoComplete="off"
          value={minutes}/>
        <input 
          name="seconds" 
          className="new-todo-form__timer" 
          placeholder="Sec" 
          onChange={(e) => setSeconds(e.target.value)} 
          onKeyDown={keyDown} 
          autoComplete="off"
          value={seconds}/>
      </form>
    </header>
  )
}

TaskInput.propTypes = {
  getNewTask: PropTypes.func.isRequired
}

export default TaskInput