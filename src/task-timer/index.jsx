// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx'
// не хочу тут в конфигурации копаться вашего линта)
import { intervalToDuration } from 'date-fns'
import { useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'

import { onTimerChange } from '../store/slice/todo.slice'
import Icon from '../icon/icon'

const TaskTimer = ({ playTimer, milisec, done, id }) => {
  const milisecRef = useRef(milisec)

  const dispatch = useDispatch()

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (!playTimer || done || !!milisecRef.current) {
        clearInterval(timerInterval)

        const newTimerData = done
          ? { playTimer: false, id, milisec: 0, done: true, status: 'completed' }
          : { id, milisec: milisecRef.current, playTimer: true }

        dispatch(onTimerChange(newTimerData))
      } else {
        milisecRef.current -= 1000
      }
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [playTimer, done])

  const duration = intervalToDuration({ start: 0, end: milisec })

  const time = [duration.hours, String(duration.minutes).padStart(2, '0'), String(duration.seconds).padStart(2, '0')]
    .filter(Boolean)
    .join(':')

  const captureEvent = (e) => {
    e.stopPropagation()

    dispatch(onTimerChange({ id, playTimer: !playTimer, milisec: milisecRef.current }))
  }

  return (
    <>
      <button type="button" onMouseDown={captureEvent} disabled={done}>
        <Icon playTimer={playTimer} done={done} />
      </button>
      <span className={clsx(done && 'timer-text')}>{time}</span>
    </>
  )
}

export default TaskTimer
