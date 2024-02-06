import { intervalToDuration } from 'date-fns'
import { useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'

import { onTimerChange } from '../store/todoSlice'
import Icon from '../icon/icon'

const TaskTimer = ({ playTimer, milisec, done, id }) => {
  const milisecRef = useRef(milisec)

  const dispatch = useDispatch()

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (playTimer) {
        if (done) {
          clearInterval(timerInterval)

          dispatch(onTimerChange({ playTimer: false, id }))

          return
        }

        if (milisecRef.current === 0) {
          clearInterval(timerInterval)

          dispatch(
            onTimerChange({
              playTimer: false,
              id,
              milisec: 0,
              done: true,
              status: 'completed',
            })
          )

          return
        }

        milisecRef.current -= 1000

        dispatch(onTimerChange({ id, milisec: milisecRef.current, playTimer: true }))
      }
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [playTimer])

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
      <span className={done ? 'timer-text' : ''}>{time}</span>
    </>
  )
}

export default TaskTimer
