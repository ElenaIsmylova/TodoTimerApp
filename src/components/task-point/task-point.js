import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

import Timer from '../timer/timer'

import './task-point.css'

const TaskPoint = (props) => {

  const {id, task, done, date, minutes, seconds, editTask, deleteTask, completeTask} = props
  const [ editState, setEditState ] = useState(false)

  function changeEditState() {
    setEditState(true)
  }

  function setEditedTask(e) {
    if (e.keyCode === 13) {
      setEditState(false)
    }
    let task = e.target.value
    editTask(id, task)
  }

  function onPreventDefault(e) {
    e.preventDefault()
  }

  const viewStyle = {}
  const editStyle = {}
    
  if(editState) {
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
          <span className="created">{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
        </label>
        <button className="icon icon-edit" onClick={changeEditState}></button>
        <button className="icon icon-destroy" onClick={() => deleteTask(id)}></button>
      </div>

      <form onSubmit={onPreventDefault}>
        <input 
          type="text" 
          style={editStyle}
          defaultValue={task}
          className="edit"
          onKeyDown={setEditedTask}
        />
      </form>
    </li>
  )
   
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

export default TaskPoint