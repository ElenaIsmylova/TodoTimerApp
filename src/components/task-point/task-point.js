import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react'

import Timer from './../timer/timer'

import './task-point.css'

export default class TaskPoint extends Component {

  state = {
    editState: false
  }

  whenCreate = () => {
    return `create ${formatDistanceToNow (
      new Date(this.props.date),
      {includeSeconds: true})} ago`
  }

  changeEditState = () => {
    this.setState({
      editState: true
    })
  }

  setEditedTask = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        editState: false
      })
    }
    let task = e.target.value
    this.props.editTask(this.props.id, task)
  }

  onPreventDefault = (e) => {
    e.preventDefault()
  }

  render() {
    const {id, task, minutes, seconds, done, deleteTask, completeTask} = this.props
    const viewStyle = {}
    const editStyle = {}
    
    if(this.state.editState) {
      viewStyle.display = 'none'
    } else {
      editStyle.display = 'none'
    }
    
    let classNames = ''
    if (done) {
      classNames = 'completed'
    }
    return (
      <li className={classNames}>
        <div className="view" style={viewStyle} >
          <input className="toggle" type="checkbox"/>
          <label>
            <button className="description" onClick={() => completeTask(id)}>
              {task}
            </button>
            <Timer minutes={minutes} seconds={seconds}/>
            <span className="created">{this.whenCreate()}</span>
          </label>
          <button className="icon icon-edit" onClick={this.changeEditState}></button>
          <button className="icon icon-destroy" onClick={() => deleteTask(id)}></button>
        </div>
    
        <form onSubmit={this.onPreventDefault}>
          <input 
            type="text" 
            style={editStyle}
            defaultValue={task}
            className="edit"
            onKeyDown={this.setEditedTask}
          />
        </form>
      </li>
    )
  }
}

TaskPoint.propTypes = {
  id: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired, 
  date: PropTypes.object.isRequired,
  done: PropTypes.bool.isRequired,
  editTask: PropTypes.func.isRequired,
  completeTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}