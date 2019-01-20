import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskView from './views/TaskView';
import socketIOClient from "socket.io-client";

const SOCKET_ENDPOINT = "http://localhost:8000";
class App extends Component {
  constructor () {
    super();
    this.state = { tasks: [] };
    this.addTask = this.addTask.bind(this);
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

  render() {
    return (
      <div className="App">
        <TaskView 
          tasks={this.state.tasks}
          onTaskAdded={this.addTask}  
        />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
