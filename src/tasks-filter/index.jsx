// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { onFilterSelect } from '../store/slice/todo.slice'

import './tasks-filter.css'

const TasksFilter = () => {
  const filter = useSelector((state) => state.data.keyFilter)
  const dispatch = useDispatch()

  const buttonsData = [{ label: 'All' }, { label: 'Active' }, { label: 'Completed' }]

  const buttons = buttonsData.map(({ label }) => (
    <li key={label}>
      <button
        type="button"
        className={clsx(label === filter && 'selected')}
        onClick={() => dispatch(onFilterSelect({ label }))}
      >
        {label}
      </button>
    </li>
  ))

  return <ul className="filters">{buttons}</ul>
}

export default TasksFilter
