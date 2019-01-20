import React, { Component } from 'react';
import { Progress, Button, Row, Col, Checkbox } from 'antd';
import './tasks.css';

class TaskItem extends Component {
    constructor () {
        super();
        this.state = { active: false };
        this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
        this.checkboxToggled = this.checkboxToggled.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
    }
    deleteButtonClicked (event) {
        this.props.onUpdate(this.props.index, { isDeleted: true });
        if(event.nativeEvent) {
            event.nativeEvent.preventDefault();
            event.nativeEvent.stopPropagation();
          }
          event.preventDefault();
          event.stopPropagation();
    }
    checkboxToggled (event) {
        let completed = this.props.task.completed;
        this.props.onUpdate(this.props.index, { completed: !completed });
        if(event.nativeEvent) {
            event.nativeEvent.preventDefault();
            event.nativeEvent.stopPropagation();
          }
          event.preventDefault();
          event.stopPropagation();
    }
    toggleActive () {
        let active = !this.state.active;
        this.setState({ active: active });
        if (active) {
            // Start timer...
        } else {
            // Stop timer...
        }
    }
    render () {
        const task = this.props.task;
        return (
            <div onClick={this.toggleActive} className={this.state.active ? "active-task" : "inactive-task"}>
                <Row>
                    <Col span={2}>
                        <Checkbox 
                            value={task.complete}
                            onChange={this.checkboxToggled} />
                    </Col>
                    <Col span={20}>
                        <p>Task: {task.text} id={this.props.index} isDeleted={!!task.isDeleted}</p>
                    </Col>
                    <Col span={2}>
                        <Button onClick={this.deleteButtonClicked}>Delete</Button>
                    </Col>
                    {/* <Progress strokeLinecap="square" percent={75} />
                    <Progress strokeLinecap="square" type="circle" percent={25} />
                    <Progress strokeLinecap="square" type="dashboard" percent={55} /> */}
                </Row>
            </div>
        );
    }
}
export default TaskItem;
