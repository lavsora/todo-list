import React from 'react'
import { intervalToDuration } from 'date-fns'

import Icon from '../icon/icon'

const TaskTimer = ({ playTimer, milisec, done, onToggleTimer }) => {
  const duration = intervalToDuration({ start: 0, end: milisec })

  const time = [duration.hours, String(duration.minutes).padStart(2, '0'), String(duration.seconds).padStart(2, '0')]
    .filter(Boolean)
    .join(':')

  const captureEvent = (e) => {
    e.stopPropagation()
    e.preventDefault()

    onToggleTimer()
  }

  return (
    <>
      <button type="button" onClick={captureEvent} disabled={done}>
        <Icon playTimer={playTimer} done={done} />
      </button>
      <span className={done ? 'timer-text' : ''}>{time}</span>
    </>
  )
}

export default TaskTimer
