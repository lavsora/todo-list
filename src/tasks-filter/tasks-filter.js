import './tasks-filter.css'

const TasksFilter = ({ filter, onFilter }) => {
  const buttonsData = [{ label: 'All' }, { label: 'Active' }, { label: 'Completed' }]

  const buttons = buttonsData.map(({ label }) => (
    <li key={label}>
      <button type="button" className={label === filter ? 'selected' : ''} onClick={() => onFilter(label)}>
        {label}
      </button>
    </li>
  ))

  return <ul className="filters">{buttons}</ul>
}

export default TasksFilter
