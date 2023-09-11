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

    this.setState(({ editDescription }) => ({
      editDescription: editDescription.replace(/\s{2,}/g, ' ').replace(/^[\s]+|[\s]+$/g, ''),
    }))

    if (this.state.editDescription.trim() !== '') {
      this.props.onEditDescription(this.state.editDescription)
    }
  }

  render() {
    const { description, done, playTimer, milisec, onDeleted, onToggleStatus, createDate, onEdit, onToggleTimer } =
      this.props

    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onToggleStatus} />
          <label>
            <span className="title">{description}</span>
            <span className="description">
              <TaskTimer milisec={milisec} playTimer={playTimer} onToggleTimer={onToggleTimer} />
            </span>
            <span className="created">created {formatDistanceToNow(createDate, { includeSeconds: true })} ago</span>
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
