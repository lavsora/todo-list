import React, { Component, createRef } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

class App extends Component {
  state = {
    data: [
      {
        id: 1,
        description: 'Completed task',
        done: true,
        status: 'completed',
        createDate: new Date(),
        playTimer: false,
        milisec: 3550000,
      },
      {
        id: 2,
        description: 'Editing task',
        done: false,
        status: 'active',
        createDate: new Date(),
        playTimer: false,
        milisec: 350000,
      },
      {
        id: 3,
        description: 'Active task',
        done: false,
        status: 'active',
        createDate: new Date(),
        playTimer: false,
        milisec: 168000,
      },
      {
        id: 4,
        description: 'Drink Coffee',
        done: true,
        status: 'completed',
        createDate: new Date(),
        playTimer: false,
        milisec: 720000,
      },
      {
        id: 5,
        description: 'Make Awesome App',
        done: false,
        status: 'active',
        createDate: new Date(),
        playTimer: false,
        milisec: 3000,
      },
    ],
    maxId: Math.floor(Math.random() * 1001),
    filter: 'All',
  }

  intervalsRef = createRef({})

  componentDidMount() {
    document.addEventListener('keydown', this.closeEdit)
    document.addEventListener('mousedown', this.closeEdit)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeEdit)
    document.removeEventListener('mousedown', this.closeEdit)
  }

  removeItem = (id) => {
    // eslint-disable-next-line
    const removeData = this.state.data.filter((item) => item.id !== id)

    this.setState({ data: removeData })
  }

  addItem = ({ description, min, sec }) => {
    const { data, maxId } = this.state

    this.setState({
      data: [
        ...data,
        {
          id: maxId,
          description,
          done: false,
          status: 'active',
          createDate: new Date(),
          playTimer: false,
          milisec: (+min * 60 + +sec) * 1000,
        },
      ],
      maxId: maxId + Math.floor(Math.random() * 1001),
    })
  }

  removeCompleted = () => {
    // eslint-disable-next-line
    const removeData = this.state.data.filter((item) => item.status !== 'completed')

    this.setState({ data: removeData })
  }

  toggleStatus = (id) => {
    // eslint-disable-next-line
    const toggleData = this.state.data.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done, status: item.done ? 'active ' : 'completed', playTimer: false }
      }

      return item
    })

    this.toggleTimer(id)

    this.setState({ data: toggleData })
  }

  editItem = (id) => {
    // eslint-disable-next-line
    const toggleData = this.state.data.map((item) => {
      if (item.id === id) {
        return { ...item, status: 'editing' }
      }

      return item
    })

    this.setState({ data: toggleData })
  }

  closeEdit = (e) => {
    if (e.keyCode === 27 || !e.target.classList.contains('edit')) {
      // eslint-disable-next-line
      const editingData = this.state.data.map((item) => {
        if (item.status === 'editing') {
          return { ...item, status: item.done ? 'completed ' : 'active' }
        }

        return item
      })

      this.setState({ data: editingData })
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
    // eslint-disable-next-line
    const updateDescription = this.state.data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          description: editDescription,
          status: 'active ',
        }
      }

      return item
    })
    this.setState({ data: updateDescription })
  }

  toggleTimer = (id) => {
    // eslint-disable-next-line
    const updatedTimer = this.state.data.map((item) => {
      if (item.id !== id) return item

      clearInterval(this.intervalsRef[id])

      delete this.intervalsRef[id]

      if (!item.playTimer) {
        const itemInterval = setInterval(() => {
          this.setState(({ data }) => ({
            data: data.map((task) => {
              if (task.id === id) {
                if (task.done) {
                  clearInterval(itemInterval)

                  return {
                    ...task,
                    playTimer: false,
                  }
                }

                if (task.milisec - 1000 <= 0) {
                  clearInterval(itemInterval)

                  return {
                    ...task,
                    milisec: 0,
                    playTimer: false,
                    done: true,
                    status: 'completed',
                  }
                }

                if (task.playTimer) {
                  return {
                    ...task,
                    milisec: task.milisec - 1000,
                  }
                }
              }

              return task
            }),
          }))
        }, 1000)

        this.intervalsRef = { [id]: itemInterval, ...this.intervalsRef }
      }

      return { ...item, playTimer: !item.playTimer }
    })

    this.setState({ data: updatedTimer })
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
            onToggleTimer={this.toggleTimer}
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
