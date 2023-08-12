import { Component } from "react";

import './new-task-form.css'

class NewTaskForm extends Component {
    state = {
        description: ''
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onSubmitDescription = (e) => {
        e.preventDefault()

        let addDescription = this.state.description

        addDescription = addDescription.replace(/\s{2,}/g, ' ');
        addDescription = addDescription.replace(/^[\s]+|[\s]+$/g, '');

        if(addDescription.replace(/^[\s]+|[\s]+$/g, '')) {
            this.props.onAdded(addDescription)

            this.setState({
                description: ''
            })
        }
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={this.onSubmitDescription}>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        onChange={this.onChangeDescription}
                        value={this.state.description}
                    />
                </form>
            </header>
        )
    }
}

export default NewTaskForm;