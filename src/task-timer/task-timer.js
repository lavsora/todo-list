import { PureComponent } from 'react'

class TaskTimer extends PureComponent {
  render() {
    return (
      <>
        <button type="button" className="icon icon-play" />
        <button type="button" className="icon icon-pause" />
        12:25
      </>
    )
  }
}

export default TaskTimer
