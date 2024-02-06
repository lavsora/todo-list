import { useSelector } from 'react-redux'

import Task from '../task'

import './task-list.css'

const TaskList = () => {
  const data = useSelector((state) => state.data.todos)
  const keyFilter = useSelector((state) => state.data.keyFilter)

  const filterData = (data, filter) => {
    switch (filter) {
      case 'Active':
        return data.filter((item) => !item.done)
      case 'Completed':
        return data.filter((item) => item.done)
      default:
        return data
    }
  }

  const visibleData = filterData(data, keyFilter)

  const items = visibleData.map((item) => {
    const { id, status, ...itemProps } = item

    return (
      <li key={id} className={status}>
        <Task {...itemProps} id={id} />
      </li>
    )
  })

  return <ul className="todo-list">{items}</ul>
}

export default TaskList
