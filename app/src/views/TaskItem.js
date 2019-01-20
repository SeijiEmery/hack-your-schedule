import React, { Component } from 'react';
import { WingBlank, WhiteSpace, Button, Checkbox } from 'antd-mobile';

class TaskItem extends Component {
    constructor () {
        super();
        // this.setCompleted = this.setCompleted.bind(this);
    }
    setCompleted (value) {
        // this.props.onTaskUpdated(this.props.task, { completed: value });
    }
    render () {
        const task = this.props.task;
        return (
            <div>
                <span>{task.text}</span>
                <Checkbox checked={task.complete} onChange={this.setCompleted} />
            </div>
        );
    }
}
export default TaskItem;
