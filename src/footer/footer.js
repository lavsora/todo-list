import TasksFilter from '../tasks-filter'

import './footer.css'

const Footer = ({ countTodo, onDeleted, filter, onFilter }) => (
  <footer className="footer">
    <span className="todo-count">{countTodo > 1 ? `${countTodo} items` : `${countTodo} item`} left</span>
    <TasksFilter filter={filter} onFilter={(label) => onFilter(label)} />
    <button type="button" className="clear-completed" onClick={onDeleted}>
      Clear completed
    </button>
  </footer>
)

export default Footer
