import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import TaskTimer from '../task-timer'

class Task extends Component {
  state = {
    editDescription: this.props.description,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.closeEdit)
    document.addEventListener('mousedown', this.closeEdit)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeEdit)
    document.removeEventListener('mousedown', this.closeEdit)
  }

  closeEdit = (e) => {
    if (e.keyCode === 27 || !e.target.classList.contains('edit')) {
      // eslint-disable-next-line
      this.setState({ editDescription: this.props.description })
    }
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
              <TaskTimer done={done} milisec={milisec} playTimer={playTimer} onToggleTimer={onToggleTimer} />
            </span>
            <span className="created">{formatDistanceToNow(createDate, { includeSeconds: true })}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEdit} disabled={done} />
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
