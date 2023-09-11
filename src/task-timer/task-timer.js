import { Component } from 'react'
import { intervalToDuration } from 'date-fns'

import Icon from '../icon/icon'

class TaskTimer extends Component {
  captureEvent = (e) => {
    e.preventDefault()

    this.props.onToggleTimer()
  }

  render() {
    const { playTimer, milisec, done } = this.props
    const duration = intervalToDuration({ start: 0, end: milisec })
    const time = [duration.hours, String(duration.minutes).padStart(2, '0'), String(duration.seconds).padStart(2, '0')]
      .filter(Boolean)
      .join(':')

    return (
      <>
        <button type="button" onClick={this.captureEvent} disabled={done}>
          <Icon playTimer={playTimer} />
        </button>
        <span>{time}</span>
      </>
    )
  }
}

export default TaskTimer
