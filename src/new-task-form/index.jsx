import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { onAddItem } from '../store/slice/todo.slice'
import './new-task-form.css'
import { REGEX, REGEX_2 } from '../common/constants'

const NewTaskForm = () => {
  const dispatch = useDispatch()

  const [description, setDescription] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onSubmitDescription = (e) => {
    e.preventDefault()

    setDescription(description.replace(REGEX, ' ').replace(REGEX_2, ''))

    if (description.trim() !== '') {
      dispatch(onAddItem({ description, min, sec }))

      setDescription('')
      setMin('')
      setSec('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmitDescription}>
        <input
          className="new-todo"
          name="description"
          placeholder="What needs to be done?"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <input
          className="new-todo-form__timer"
          name="min"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          pattern="^(?:[0-9]|[0-5][0-9]|60)$"
          placeholder="Min"
          required
        />
        <input
          className="new-todo-form__timer"
          name="sec"
          value={sec}
          onChange={(e) => setSec(e.target.value)}
          pattern="^(?:[1-9]|[1-5][0-9]|60)$"
          placeholder="Sec"
          required
        />

        <button type="submit" />
      </form>
    </header>
  )
}

export default NewTaskForm
