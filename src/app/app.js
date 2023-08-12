import React, { Component } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

class App extends Component {
  state = {
    data: [
      { id: 1, description: 'Completed task', done: true, status: 'completed', createDate: new Date() },
      { id: 2, description: 'Editing task', done: false, status: 'active', createDate: new Date() },
      { id: 3, description: 'Active task', done: false, status: 'active', createDate: new Date() },
      { id: 4, description: 'Drink Coffee', done: true, status: 'completed', createDate: new Date() },
      { id: 5, description: 'Make Awesome App', done: false, status: 'active', createDate: new Date() },
    ],
    maxId: Math.floor(Math.random() * 1001),
    filter: 'All',
  }

  componentDidMount() {
    document.addEventListener('keydown', this.closeEdit)
    document.addEventListener('mousedown', this.closeEdit)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeEdit)
    document.removeEventListener('mousedown', this.closeEdit)
  }

  removeItem = (id) => {
    this.setState(({ data }) => ({
      data: data.filter((item) => item.id !== id),
    }))
  }

  addItem = (description) => {
    const { data, maxId } = this.state

    this.setState({
      data: [...data, { id: maxId, description: description, done: false, status: 'active', createDate: new Date() }],
      maxId: maxId + Math.floor(Math.random() * 1001),
    })
  }

  removeCompleted = () => {
    this.setState(({ data }) => ({
      data: data.filter((item) => item.status !== 'completed'),
    }))
  }

  toggleStatus = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done, status: item.done ? 'active ' : 'completed' }
        }

        return item
      }),
    }))
  }

  editItem = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, status: 'editing' }
        }

        return item
      }),
    }))
  }

  closeEdit = (e) => {
    if (e.keyCode === 27 || !e.target.classList.contains('edit')) {
      this.setState(({ data }) => ({
        data: data.map((item) => {
          if (item.status === 'editing') {
            return { ...item, status: item.done ? 'completed ' : 'active' }
          }

          return item
        }),
      }))
    }
  }

  filterPost = (data, filter) => {
    switch (filter) {
      case 'Active':
        return data.filter((item) => !item.done)
      case 'Completed':
        return data.filter((item) => item.done)
      default:
        return data
    }
  }

  filterSelect = (filter) => {
    this.setState({ filter })
  }

  editDescriptionItem = (editDescription, id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, description: editDescription, done: false, status: 'active ' }
        }

        return item
      }),
    }))
  }

  render() {
    const { data, filter } = this.state
    const visibleData = this.filterPost(data, filter)

    return (
      <section className="todoapp">
        <NewTaskForm onAdded={this.addItem} />
        <section className="main">
          <TaskList
            data={visibleData}
            onDeleted={this.removeItem}
            onToggleStatus={this.toggleStatus}
            onEdit={this.editItem}
            onKeyEdit={this.keyPressEdit}
            onEditDescription={this.editDescriptionItem}
          />

          <Footer
            countTodo={data.filter((item) => !item.done).length}
            onDeleted={this.removeCompleted}
            filter={filter}
            onFilter={this.filterSelect}
          />
        </section>
      </section>
    )
  }
}

export default App
