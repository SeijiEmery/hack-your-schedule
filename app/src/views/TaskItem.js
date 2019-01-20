import React, { Component } from 'react';

class TaskItem extends Component {
    render () {
        return <p>This is a task, and its text is "{this.props.task.text}"</p>
    }
}
export default TaskItem;
