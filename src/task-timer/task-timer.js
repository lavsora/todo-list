import React, { PureComponent } from 'react'
import { intervalToDuration } from 'date-fns'

import Icon from '../icon/icon'

class TaskTimer extends PureComponent {
  render() {
    const { playTimer, milisec, done, onToggleTimer } = this.props
    const duration = intervalToDuration({ start: 0, end: milisec })
    const time = [duration.hours, String(duration.minutes).padStart(2, '0'), String(duration.seconds).padStart(2, '0')]
      .filter(Boolean)
      .join(':')

    return (
      <>
        <div>
          <button type="button" onMouseDown={onToggleTimer} disabled={done}>
            <Icon playTimer={playTimer} done={done} />
          </button>
        </div>
        <span className={done ? 'timer-text' : ''}>{time}</span>
      </>
    )
  }
}

export default TaskTimer
