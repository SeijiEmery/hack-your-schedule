import React, { Component } from 'react';
import { Progress, Button, Row, Col, Checkbox } from 'antd';
import { durationToString } from '../util/DurationToString';
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
        if (this.state.active) {
            this.toggleActive();
        }
        if(event.nativeEvent) {
            event.nativeEvent.preventDefault();
            event.nativeEvent.stopPropagation();
          }
          event.preventDefault();
          event.stopPropagation();
          this.props.onUpdate(this.props.index, { isDeleted: true });
    }
    checkboxToggled (event) {
        if (this.state.active) {
            this.toggleActive();
        }

        let completed = this.props.task.completed;
        if(event.nativeEvent) {
            event.nativeEvent.preventDefault();
            event.nativeEvent.stopPropagation();
          }
          event.preventDefault();
          event.stopPropagation();
          this.props.onUpdate(this.props.index, { completed: !completed });
    }
    toggleActive () {
        let active = !this.state.active;
        this.setState({ active: active, startTime: active ? Date.now() : null });
        if (active) {
            // Start timer...
            this.interval = setInterval(() => {
                this.setState({ 
                    timeElapsed: this.props.task.timeElapsed + 
                        (Date.now() - this.state.startTime) 
                });
            }, 1000);
        } else {
            // Stop timer...
            clearInterval(this.interval);
            this.props.onUpdate(this.props.index, { timeElapsed: this.state.timeElapsed });
        }
    }
    render () {
        const task = this.props.task;
        let timeElapsed = this.state.active ?
            this.state.timeElapsed :
            task.timeElapsed;
        return (
            <div onClick={this.toggleActive} className={this.state.active ? "active-task" : "inactive-task"}>
                <Row>
                    <Col span={2}>
                        <Checkbox 
                            value={task.complete}
                            onChange={this.checkboxToggled} />
                    </Col>
                    <Col span={20}>
                        <p>Task: {task.text}</p>
                        <p>{durationToString(timeElapsed)}</p>
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
