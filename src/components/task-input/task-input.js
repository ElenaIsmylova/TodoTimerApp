import PropTypes from 'prop-types'
import { Component } from 'react'

import './task-input.css'

export default class TaskInput extends Component {

  state = {
    task: '',
    minutes: '',
    seconds: '',
  }

  keyDown = (e) => {
    
    const {task, minutes, seconds} = this.state
    const {getNewTask} = this.props
    if (e.key === 'Enter' && task.length > 0) {
      
      if (Number(minutes) >= 0 && Number(seconds) >= 0) {
        getNewTask(task, minutes, seconds)
        this.setState({
          task: '',
        })
      } else {
        alert('Вы ввели некорректные данные!\nПоля Min и Sec должны содержать цифры.')
        
      }
      this.setState({
        minutes: '',
        seconds: '',
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {task, minutes, seconds} = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.handleSubmit} >
          <input 
            name="task" 
            className="new-todo" 
            placeholder="Task" 
            onChange={this.handleChange} 
            onKeyDown={this.keyDown} 
            autoComplete="off"
            value={task}/>
          <input 
            name="minutes" 
            className="new-todo-form__timer" 
            placeholder="Min" 
            onChange={this.handleChange} 
            onKeyDown={this.keyDown} 
            autoComplete="off"
            value={minutes}/>
          <input 
            name="seconds" 
            className="new-todo-form__timer" 
            placeholder="Sec" 
            onChange={this.handleChange} 
            onKeyDown={this.keyDown} 
            autoComplete="off"
            value={seconds}/>
        </form>
      </header>
    )
  }
}

TaskInput.propTypes = {
  getNewTask: PropTypes.func.isRequired
}