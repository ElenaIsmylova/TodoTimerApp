import { Component } from 'react'

import TaskInput from '../task-input/task-input'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

import './app.css'

export default class App extends Component {

  state = {
    items: [],
    id: 1,
    filter: 'all',
  }

  getNewTask = (task, minutes, seconds) => {
    const newItem = {
      id: this.state.id,
      task: task[0].toUpperCase() + task.slice(1),
      minutes: minutes,
      seconds: seconds,
      done: false,
      date: new Date(),
    }
    const updatedItems = [...this.state.items, newItem]
    this.setState({
      items: updatedItems,
      id: this.state.id + 1,
    })
  }

  deleteTask = (id) => {
    const filteredItems = this.state.items.filter(point => {
      return point.id !== id
    })
    this.setState({
      items: filteredItems
    })
  }

  editTask = (id, task) => {
        
    const idx = this.state.items.findIndex(item => item.id === id)

    const oldItem = this.state.items[idx]
    const newItem = {...oldItem, task: task}

    const newItems = [
      ...this.state.items.slice(0, idx),
      newItem,
      ...this.state.items.slice(idx + 1)
    ]

    this.setState({
      items: newItems
    })
  }

  completeTask = (id) => {
        
    const idx = this.state.items.findIndex(item => item.id === id)

    const oldItem = this.state.items[idx]
    const newItem = {...oldItem, done: !oldItem.done}

    const newItems = [
      ...this.state.items.slice(0, idx),
      newItem,
      ...this.state.items.slice(idx + 1)
    ]

    this.setState({
      items: newItems
    })
  }

  filterTask = (items, filter) => {
    switch (filter) {
    case 'active':
      return items.filter(item => !item.done)
    case 'completed':
      return items.filter(item => item.done)
    default:
      return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }

  onClearCompleted = () => {
    this.setState(({items}) => {
      const activeTodo = items.filter(item => !item.done)
      return {
        items: activeTodo
      }
    })
  }

  render() {
    const {items, filter} = this.state
    const doneCount = items.length - items.filter(item => item.done).length
    const visibleData = this.filterTask(items, filter)
    return (
      <div className="todoapp">

        <TaskInput 
          getNewTask={this.getNewTask}/>

        <TaskList  
          items={visibleData}
          editTask={this.editTask}
          completeTask={this.completeTask}
          deleteTask={this.deleteTask}/>

        <Footer
          filter={filter} 
          doneCount={doneCount} 
          onFilterSelect={this.onFilterSelect}
          onClearCompleted={this.onClearCompleted}
        />
      </div>
    )
  }
}
