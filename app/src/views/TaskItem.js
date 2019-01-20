import React, { Component } from 'react';
import { Progress } from 'antd';
import './tasks.css';

class TaskItem extends Component {
    render () {
        const task = this.props.task;
        return (
            <div className=".task-wrap">
                <p>Task: {task.text}</p>
                {/* <Progress strokeLinecap="square" percent={75} />
                <Progress strokeLinecap="square" type="circle" percent={25} />
                <Progress strokeLinecap="square" type="dashboard" percent={55} /> */}
            </div>
        );
    }
}
export default TaskItem;
