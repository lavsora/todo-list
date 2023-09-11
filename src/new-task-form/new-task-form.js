import { Component } from 'react'

import './new-task-form.css'

class NewTaskForm extends Component {
  state = {
    description: '',
    min: '',
    sec: '',
  }

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmitDescription = (e) => {
    e.preventDefault()

    this.setState(({ description }) => ({
      description: description.replace(/\s{2,}/g, ' ').replace(/^[\s]+|[\s]+$/g, ''),
    }))

    if (this.state.description.trim() !== '') {
      this.props.onAdded(this.state)

      this.setState({
        description: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmitDescription}>
          <input
            className="new-todo"
            name="description"
            placeholder="What needs to be done?"
            onChange={this.onChangeInput}
            value={this.state.description}
            required
          />
          <input
            className="new-todo-form__timer"
            name="min"
            value={this.state.min}
            onChange={this.onChangeInput}
            pattern="^(?:[0-9]|[0-5][0-9]|60)$"
            placeholder="Min"
            required
          />
          <input
            className="new-todo-form__timer"
            name="sec"
            value={this.state.sec}
            onChange={this.onChangeInput}
            pattern="^(?:[1-9]|[1-5][0-9]|60)$"
            placeholder="Sec"
            required
          />

          <button type="submit" />
        </form>
      </header>
    )
  }
}

export default NewTaskForm
