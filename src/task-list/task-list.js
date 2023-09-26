import Task from '../task'

import './task-list.css'

const TaskList = ({ data, onDeleted, onToggleStatus, onEdit, onEditDescription, onToggleTimer }) => {
  const items = data.map((item) => {
    const { id, status, ...itemProps } = item

    return (
      <li key={id} className={status}>
        <Task
          {...itemProps}
          id={id}
          onDeleted={() => onDeleted(id)}
          onToggleStatus={() => onToggleStatus(id)}
          onEdit={() => onEdit(id)}
          onEditDescription={(editDescription) => onEditDescription(editDescription, id)}
          onToggleTimer={() => onToggleTimer(id)}
        />
      </li>
    )
  })

  return <ul className="todo-list">{items}</ul>
}

export default TaskList
