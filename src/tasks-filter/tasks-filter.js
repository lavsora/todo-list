import { PureComponent } from 'react'

import './tasks-filter.css'

class TasksFilter extends PureComponent {
  render() {
    const { filter, onFilter } = this.props

    const buttonsData = [{ label: 'All' }, { label: 'Active' }, { label: 'Completed' }]

    const buttons = buttonsData.map(({ label }) => {
      return (
        <li key={label}>
          <button type="button" className={label === filter ? 'selected' : ''} onClick={() => onFilter(label)}>
            {label}
          </button>
        </li>
      )
    })

    return <ul className="filters">{buttons}</ul>
  }
}

export default TasksFilter
