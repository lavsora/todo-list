import { Component } from "react";

import TasksFilter from "../tasks-filter";

import './footer.css';

class Footer extends Component {
    render() {
        const { countTodo, onDeleted, filter, onFilter } = this.props;

        return (
            <footer className="footer">
                <span className="todo-count">{countTodo > 1 ? `${countTodo} items` : `${countTodo} item` } left</span>
                <TasksFilter filter={filter} onFilter={(label) => onFilter(label)} />
                <button className="clear-completed"
                    onClick={onDeleted}>Clear completed</button>
            </footer>
        )
    }
}

export default Footer;