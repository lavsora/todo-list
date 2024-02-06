import { useSelector, useDispatch } from 'react-redux'

import { onFilterSelect } from '../store/todoSlice'

import './tasks-filter.css'

const TasksFilter = () => {
  const filter = useSelector((state) => state.data.keyFilter)
  const dispatch = useDispatch()

  const buttonsData = [{ label: 'All' }, { label: 'Active' }, { label: 'Completed' }]

  const buttons = buttonsData.map(({ label }) => (
    <li key={label}>
      <button
        type="button"
        className={label === filter ? 'selected' : ''}
        onClick={() => dispatch(onFilterSelect({ label }))}
      >
        {label}
      </button>
    </li>
  ))

  return <ul className="filters">{buttons}</ul>
}

export default TasksFilter
