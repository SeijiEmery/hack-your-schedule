import React, { Component } from 'react';
import { Layout } from 'antd';
import TaskItem from './TaskItem';

class TaskView extends Component {
    render () {
        return (
            <Layout>
                {/* <Content> */}
                    {this.props.tasks.map((task) => {
                        return <TaskItem task={task} />
                    })} 
                {/* </Content> */}
            </Layout>
        )
    }
}
export default TaskView;
