import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskView from './views/TaskView';
import socketIOClient from "socket.io-client";
import { Layout, Row, Col } from 'antd';

const SOCKET_ENDPOINT = "http://localhost:8000";
class App extends Component {
  constructor () {
    super();
    this.state = { tasks: [] };
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }
  // Called by TaskItem when a new task item is added.
  // Task state is constructed and passed here as task
  componentDidMount(){
    this.socket = socketIOClient(SOCKET_ENDPOINT);
    this.socket.on('sync', (data) => {
      this.setState({tasks: data.tasks});
    })
  }
  addTask (task) {
    let socket = this.socket;
    const demo = {
            text: task.text,
            complete: false,
            timeElapsed: 0.0,
            tags: [],
            timestamp:0.0//epoc 
        };
    console.log(demo);
    if(socket){
      socket.emit("add",demo);
    }
    this.setState(state => ({
      tasks: state.tasks.concat([ task ])
    }))
  }
  updateTask (taskIndex, update) {
    if (taskIndex < 0 || taskIndex >= this.state.tasks.length) {
      window.alert("INDEX OUT OF RANGE: "+taskIndex);
      return;
    }
    let tasks = this.state.tasks;
    // window.alert("Updating task: "+taskIndex+" "+JSON.stringify(update));
    tasks[taskIndex] = Object.assign(tasks[taskIndex], update);
    // window.alert("after: "+JSON.stringify(tasks[taskIndex]));

    // filter to non-deleted tasks. Also has byproduct of copying to avoid mutation
    // (though we are, uh, mutating above)
    this.updateTasks(tasks); 
  }
  updateTasks (tasks) {
    
    this.setState({ tasks: tasks.filter((task) => !task.isDeleted) });
    // move socket I/O stuff here
    this.socket.emit("update",tasks);

  }

  renderContent () {
    return (
      <Row>
        <Col span={6} />
        <TaskView 
          tasks={this.state.tasks}
          onTaskAdded={this.addTask}
          onTaskUpdated={this.updateTask}  
        />
        <Col span={6} />
      </Row>
    );
  }
  renderHeader () {
    return (
      <Row>
        <h1>Hack Your Schedule</h1>
      </Row>
    );
  }
  renderFooter () {
    return (
      <Row>
        <h2></h2>
      </Row>
    );
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Layout.Header>
            {this.renderHeader()}
          </Layout.Header>
          <Layout.Content>
            {this.renderContent()}
          </Layout.Content>
          <Layout.Footer>
            {this.renderFooter()}
          </Layout.Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
