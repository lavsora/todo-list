import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import TaskTimer from '../task-timer'

class Task extends Component {
  state = {
    editDescription: this.props.description,
  }

  onEditDescription = (e) => {
    this.setState({
      editDescription: e.target.value,
    })
  }

  onSubmitEditDescription = (e) => {
    e.preventDefault()

    let editText = this.state.editDescription

    editText = editText.replace(/\s{2,}/g, ' ')
    editText = editText.replace(/^[\s]+|[\s]+$/g, '')

    if (editText.replace(/^[\s]+|[\s]+$/g, '')) {
      this.props.onEditDescription(editText)

      this.setState({
        editDescription: editText,
      })
    }
  }

  render() {
    const { description, done, onDeleted, onToggleStatus, createDate, onEdit } = this.props

    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onToggleStatus} />
          <label>
            <span className="title">{description}</span>
            <span className="description">
              <TaskTimer />
            </span>
            <span className="created">
              created
              {formatDistanceToNow(createDate, { includeSeconds: true })} ago
            </span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEdit} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <form onSubmit={this.onSubmitEditDescription}>
          <input type="text" className="edit" onChange={this.onEditDescription} value={this.state.editDescription} />
        </form>
      </>
    )
  }
}

export default Task
