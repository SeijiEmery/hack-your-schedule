import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import { Button, List, InputItem } from 'antd-mobile';
import TaskItem from './TaskItem';

// Self-contained task "view".
// Contains internal layout, textbox w/ "Add task" button,
// and list of TaskItems.
class TaskView extends Component {
    constructor () {
        super();
        this.state = { taskDescrip: "" };
        this.addTask = this.addTask.bind(this);
        this.setNewTaskText = this.setNewTaskText.bind(this);
    }
    addTask () {
        if (this.state.taskDescrip === "") {
            return;
        }
        this.setState({ taskDescrip: "" });
        this.props.onTaskAdded({
            text: this.state.taskDescrip,
            complete: false,
            timeElapsed: 0.0,
            tags: [],
        });
    }
    
    setNewTaskText (text) {
        this.setState({ taskDescrip: text });
    }
    render () {
        return (
            <Col span={12}>
                <Row>
                    <Col span={20}>
                    <InputItem 
                        value={this.state.taskDescrip} 
                        onChange={this.setNewTaskText}
                        onPressEnter={this.setNewTaskText}
                    />
                    </Col>
                    <Col span={4}>
                    <Button onClick={this.addTask}>Add Task</Button>
                    </Col>
                </Row>
                {this.props.tasks.map((task, i) => {
                    return <TaskItem 
                        task={task} 
                        index={i}
                        onUpdate={this.props.onTaskUpdated}    
                    />
                })}
            </Col>
        )
    }
}
export default TaskView;
