import PropTypes from 'prop-types'

import TaskPoint from '../task-point/task-point'

import './task-list.css'

const TaskList = (props) => {

  const {items, editTask, completeTask, deleteTask} = props
  const elements = items.map(point => {
    return <TaskPoint 
      key={point.id}
      id={point.id}
      task={point.task}
      minutes={point.minutes}
      seconds={point.seconds} 
      date={point.date}
      done={point.done}
      editTask={editTask}
      completeTask={completeTask}
      deleteTask={deleteTask}/>
  })
  return (
    <section className="main">
      <ul className="todo-list">
        {elements}
      </ul>
    </section>
  )
}

TaskList.propTypes = {
  items: PropTypes.array.isRequired,
  editTask: PropTypes.func.isRequired,
  completeTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}

export default TaskList