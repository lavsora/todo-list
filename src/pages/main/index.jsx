import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


import './main.css'
import { onCloseEdit } from '../../store/slice/todo.slice'
import NewTaskForm from '../../new-task-form'
import Footer from '../../footer'
import TaskList from '../../task-list'

const Main = () => {
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

export default Main
