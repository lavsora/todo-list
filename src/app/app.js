import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { onCloseEdit } from '../store/todoSlice'
import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

const App = () => {
  const dispatch = useDispatch()

  // const intervalsRef = useRef({})

  useEffect(() => {
    document.addEventListener('keydown', (e) => dispatch(onCloseEdit(e)))
    document.addEventListener('mousedown', (e) => dispatch(onCloseEdit(e)))

    return () => {
      document.removeEventListener('keydown', (e) => dispatch(onCloseEdit(e)))
      document.removeEventListener('mousedown', (e) => dispatch(onCloseEdit(e)))
    }
  })

  const toggleTimer = (id) => {
    console.log(id)
    // const updateTimer = data.map((item) => {
    //   if (item.id !== id) return item

    //   clearInterval(intervalsRef.current[id])

    //   delete intervalsRef.current[id]

    //   const timerInterval = setInterval(() => {
    //     setData((prevState) =>
    //       prevState.map((timer) => {
    //         if (timer.id === id) {
    //           if (timer.playTimer) {
    //             if (timer.done) {
    //               clearInterval(timerInterval)

    //               return {
    //                 ...timer,
    //                 playTimer: false,
    //               }
    //             }

    //             if (timer.milisec <= 0) {
    //               clearInterval(timerInterval)

    //               return {
    //                 ...timer,
    //                 milisec: 0,
    //                 playTimer: false,
    //                 done: true,
    //                 status: 'completed',
    //               }
    //             }

    //             return {
    //               ...timer,
    //               milisec: timer.milisec - 1000,
    //             }
    //           }
    //         }

    //         return timer
    //       })
    //     )
    //   }, 1000)

    //   intervalsRef.current = { [id]: timerInterval, ...intervalsRef.current }

    //   return { ...item, playTimer: !item.playTimer }
    // })

    // setData(updateTimer)
  }

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList onToggleTimer={toggleTimer} />

        <Footer />
      </section>
    </section>
  )
}

export default App
