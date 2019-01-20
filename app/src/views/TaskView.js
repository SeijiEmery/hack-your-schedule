import React, { Component } from 'react';
import { Layout } from 'antd';
import { Button, List, InputItem } from 'antd-mobile';
import TaskItem from './TaskItem';
import './tasks.css';

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
            <div className="task-container">
                <Layout>
                    <Layout.Header>
                        <InputItem 
                            value={this.state.taskDescrip} 
                            onChange={this.setNewTaskText}
                            onPressEnter={this.setNewTaskText}
                        />
                        <Button onClick={this.addTask}>Add Task</Button>
                    </Layout.Header>
                    {/* <Content> */}
                        <List>
                            {this.props.tasks.map((task) => {
                                return <TaskItem task={task} />
                            })} 
                        </List>
                    {/* </Content> */}
                </Layout>
            </div>
        )
    }
}
export default TaskView;
