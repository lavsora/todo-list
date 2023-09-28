import React, { useState, useEffect, useRef } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

const App = () => {
  const [data, setData] = useState([
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
      milisec: 5000,
    },
  ])

  const [maxId, setMaxId] = useState(Math.floor(Math.random() * 1001))
  const [filter, setFilter] = useState('All')

  const intervalsRef = useRef({})

  useEffect(() => {
    const closeEdit = (e) => {
      if (e.keyCode === 27) {
        setData((prevState) =>
          prevState.map((item) => {
            if (item.status === 'editing') {
              return { ...item, status: 'active' }
            }

            return item
          })
        )
      }
    }

    const onCloseEdit = (e) => {
      if (!e.target.classList.contains('edit')) {
        setData((prevState) =>
          prevState.map((item) => {
            if (item.status === 'editing') {
              return { ...item, status: 'active' }
            }

            return item
          })
        )
      }
    }

    document.addEventListener('keydown', closeEdit)
    document.addEventListener('mousedown', onCloseEdit)

    return () => {
      document.removeEventListener('keydown', closeEdit)
      document.removeEventListener('mousedown', onCloseEdit)
    }
  })

  const removeItem = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id))
  }

  const addItem = ({ description, min, sec }) => {
    setData([
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
    ])
    setMaxId(maxId + Math.floor(Math.random() * 1001))
  }

  const removeCompleted = () => {
    setData((prevData) => prevData.filter((item) => item.status !== 'completed'))
  }

  const toggleTimer = (id) => {
    const updateTimer = data.map((item) => {
      if (item.id !== id) return item

      clearInterval(intervalsRef.current[id])

      delete intervalsRef.current[id]

      const timerInterval = setInterval(() => {
        setData((prevState) =>
          prevState.map((timer) => {
            if (timer.id === id) {
              if (timer.playTimer) {
                if (timer.done) {
                  clearInterval(timerInterval)

                  return {
                    ...timer,
                    playTimer: false,
                  }
                }

                if (timer.milisec <= 0) {
                  clearInterval(timerInterval)

                  return {
                    ...timer,
                    milisec: 0,
                    playTimer: false,
                    done: true,
                    status: 'completed',
                  }
                }

                return {
                  ...timer,
                  milisec: timer.milisec - 1000,
                }
              }
            }

            return timer
          })
        )
      }, 1000)

      intervalsRef.current = { [id]: timerInterval, ...intervalsRef.current }

      return { ...item, playTimer: !item.playTimer }
    })

    setData(updateTimer)
  }

  const toggleStatus = (id) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done, status: item.done ? 'active ' : 'completed', playTimer: false }
        }

        return item
      })
    )
  }

  const editItem = (id) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, status: 'editing' }
        }

        return item
      })
    )
  }

  const filterPost = (data, filter) => {
    switch (filter) {
      case 'Active':
        return data.filter((item) => !item.done)
      case 'Completed':
        return data.filter((item) => item.done)
      default:
        return data
    }
  }

  const filterSelect = (filter) => {
    setFilter(filter)
  }

  const editDescriptionItem = (editDescription, id) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            description: editDescription,
            status: 'active',
          }
        }

        return item
      })
    )
  }

  const visibleData = filterPost(data, filter)

  return (
    <section className="todoapp">
      <NewTaskForm onAdded={addItem} />
      <section className="main">
        <TaskList
          data={visibleData}
          onDeleted={removeItem}
          onToggleStatus={toggleStatus}
          onToggleTimer={toggleTimer}
          onEdit={editItem}
          onEditDescription={editDescriptionItem}
        />

        <Footer
          countTodo={data.filter((item) => !item.done).length}
          onDeleted={removeCompleted}
          filter={filter}
          onFilter={filterSelect}
        />
      </section>
    </section>
  )
}

export default App
