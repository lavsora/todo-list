import { useDispatch, useSelector } from 'react-redux'

import { onRemoveCompleted } from '../store/slice/todo.slice'
import TasksFilter from '../tasks-filter'

import './footer.css'

const Footer = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data.todos)

  const countTodo = data.filter((item) => !item.done).length

  return (
    <footer className="footer">
      <span className="todo-count">{countTodo > 1 ? `${countTodo} items` : `${countTodo} item`} left</span>
      <TasksFilter />
      <button type="button" className="clear-completed" onClick={() => dispatch(onRemoveCompleted())}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
