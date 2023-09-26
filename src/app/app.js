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
      milisec: 3000,
    },
  ])

  const [maxId, setMaxId] = useState(Math.floor(Math.random() * 1001))
  const [filter, setFilter] = useState('All')
  const [idTimer, setIdTimer] = useState(0)
  const [timerStatus, setTimerStatus] = useState(false)

  let intervalsRef = useRef(null)

  const closeEdit = (e) => {
    if (e.keyCode === 27 || !e.target.classList.contains('edit')) {
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

  useEffect(() => {
    console.log('ус эффект')
    delete intervalsRef[idTimer]

    setData((prevData) =>
      prevData.map((item) => {
        clearInterval(intervalsRef[idTimer])

        delete intervalsRef[idTimer]

        if (item.playTimer) {
          const itemInterval = setInterval(() => {
            setData((prevState) =>
              prevState.map((task) => {
                if (task.id === idTimer) {
                  console.log('id совпадает')
                  if (task.done) {
                    console.log('task done')
                    clearInterval(itemInterval)

                    return {
                      ...task,
                      playTimer: false,
                    }
                  }

                  if (task.milisec <= 0) {
                    console.log('< 0')
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
                    console.log('milisec - 1000')
                    return {
                      ...task,
                      milisec: task.milisec - 1000,
                    }
                  }
                }

                return task
              })
            )
          }, 1000)

          intervalsRef = { [idTimer]: itemInterval, ...intervalsRef }
        }

        return item
      })
    )
    console.log(intervalsRef)

    return () => {
      clearInterval(intervalsRef[idTimer])
    }
  }, [timerStatus])

  useEffect(() => {
    document.addEventListener('keydown', closeEdit)
    document.addEventListener('mousedown', closeEdit)

    return () => {
      document.removeEventListener('keydown', closeEdit)
      document.removeEventListener('mousedown', closeEdit)
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
    setIdTimer(id)

    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) return { ...item, playTimer: !item.playTimer }

        return item
      })
    )

    setTimerStatus(!timerStatus)
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
