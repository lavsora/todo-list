import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { useDispatch } from 'react-redux'

import { onRemoveItem, onToggleStatus, onEditItem, onEditDescriptionItem } from '../store/todoSlice'
import TaskTimer from '../task-timer'

const Task = ({ id, description, done, playTimer, milisec, createDate, onToggleTimer }) => {
  const dispatch = useDispatch()
  const [editDescription, setEditDescription] = useState(description)

  const closeEditSaveDescription = (e) => {
    if (e.keyCode === 27) {
      setEditDescription(description)
    }
  }

  const onCloseEditSaveDescription = (e) => {
    if (!e.target.classList.contains('edit')) {
      setEditDescription(description)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeEditSaveDescription)
    document.addEventListener('click', onCloseEditSaveDescription)

    return () => {
      document.removeEventListener('keydown', closeEditSaveDescription)
      document.removeEventListener('click', onCloseEditSaveDescription)
    }
  })

  const onChangeDescription = (e) => {
    setEditDescription(e.target.value)
  }

  const onSubmitEditDescription = (e) => {
    e.preventDefault()

    setEditDescription(editDescription.replace(/\s{2,}/g, ' ').replace(/^[\s]+|[\s]+$/g, ''))

    if (editDescription.trim() !== '') {
      dispatch(onEditDescriptionItem({ editDescription, id }))
    }
  }

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={() => dispatch(onToggleStatus({ id }))} />
        <div className="view-content">
          <span className="title">{description}</span>
          <span className="description">
            <TaskTimer done={done} milisec={milisec} playTimer={playTimer} id={id} onToggleTimer={onToggleTimer} />
          </span>
          <span className="created">{formatDistanceToNow(createDate, { includeSeconds: true })}</span>
        </div>
        <button type="button" className="icon icon-edit" onClick={() => dispatch(onEditItem({ id }))} disabled={done} />
        <button type="button" className="icon icon-destroy" onClick={() => dispatch(onRemoveItem({ id }))} />
      </div>
      <form onSubmit={onSubmitEditDescription}>
        <input type="text" className="edit" onChange={onChangeDescription} value={editDescription} />
      </form>
    </>
  )
}

export default Task
