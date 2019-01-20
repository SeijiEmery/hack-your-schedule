import React, { Component } from 'react';
import { Progress, Button } from 'antd';
import './tasks.css';

class TaskItem extends Component {
    constructor () {
        super();
        this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
    }
    deleteButtonClicked () {
        this.props.onUpdate(this.props.index, { isDeleted: true });
    }
    render () {
        const task = this.props.task;
        return (
            <div className=".task-wrap">
                <span>
                    <p>Task: {task.text} id={this.props.index} isDeleted={!!task.isDeleted}</p>
                    <Button onClick={this.deleteButtonClicked}>Delete</Button>
                </span>

                {/* <Progress strokeLinecap="square" percent={75} />
                <Progress strokeLinecap="square" type="circle" percent={25} />
                <Progress strokeLinecap="square" type="dashboard" percent={55} /> */}
            </div>
        );
    }
}
export default TaskItem;
