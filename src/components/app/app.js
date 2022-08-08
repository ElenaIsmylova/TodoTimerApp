import { useState } from 'react'

import TaskInput from '../task-input/task-input'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

import './app.css'

const App = () => {

  const [ items, setItems ] = useState([])
  const [ id, setId ] = useState(1)
  const [ filter, setFilter ] = useState('all')

  function getNewTask(task, minutes, seconds) {
    const newItem = {
      id: id,
      task: task[0].toUpperCase() + task.slice(1),
      minutes: minutes,
      seconds: seconds,
      done: false,
      date: new Date(),
    }
    const updatedItems = [...items, newItem]
    setItems(updatedItems)
    setId(id + 1)
  }

  function deleteTask(id) {
    const filteredItems = items.filter(point => {
      return point.id !== id
    })
    setItems(filteredItems)
  }

  function editTask(id, task) {
        
    const idx = items.findIndex(item => item.id === id)

    const oldItem = items[idx]
    const newItem = {...oldItem, task: task}

    const newItems = [
      ...items.slice(0, idx),
      newItem,
      ...items.slice(idx + 1)
    ]
    setItems(newItems)
  }

  function completeTask(id) {
        
    const idx = items.findIndex(item => item.id === id)

    const oldItem = items[idx]
    const newItem = {...oldItem, done: !oldItem.done}

    const newItems = [
      ...items.slice(0, idx),
      newItem,
      ...items.slice(idx + 1)
    ]
    setItems(newItems)
  }

  function filterTask(items, filter) {
    switch (filter) {
    case 'active':
      return items.filter(item => !item.done)
    case 'completed':
      return items.filter(item => item.done)
    default:
      return items
    }
  }

  function onFilterSelect(filter) {
    setFilter(filter)
  }

  function onClearCompleted() {
    const activeTodo = items.filter(item => !item.done)
    setItems(activeTodo)
  }

  const doneCount = items.length - items.filter(item => item.done).length
  const visibleData = filterTask(items, filter)
  return (
    <div className="todoapp">

      <TaskInput 
        getNewTask={getNewTask}/>

      <TaskList  
        items={visibleData}
        editTask={editTask}
        completeTask={completeTask}
        deleteTask={deleteTask}/>

      <Footer
        filter={filter} 
        doneCount={doneCount} 
        onFilterSelect={onFilterSelect}
        onClearCompleted={onClearCompleted}
      />
    </div>
  )
}

export default App