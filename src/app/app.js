import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { onCloseEdit } from '../store/todoSlice'
import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('keydown', (e) => dispatch(onCloseEdit(e)))
    document.addEventListener('mousedown', (e) => dispatch(onCloseEdit(e)))

    return () => {
      document.removeEventListener('keydown', (e) => dispatch(onCloseEdit(e)))
      document.removeEventListener('mousedown', (e) => dispatch(onCloseEdit(e)))
    }
  })

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  )
}

export default App
