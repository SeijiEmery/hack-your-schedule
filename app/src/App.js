import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskView from './views/TaskView';

class App extends Component {
  constructor () {
    super();
    this.state = { tasks: [] };
    this.addTask = this.addTask.bind(this);
  }
  // Called by TaskItem when a new task item is added.
  // Task state is constructed and passed here as task
  addTask (task) {
    this.setState(state => ({
      tasks: state.tasks.concat([ task ])
    }))
  }
  updateTask (task, update) {
    if (task.taskId < 0 || task.taskId >= this.state.tasks.length)
      return;

    window.alert("updating task! "+JSON.stringify(task)+JSON.stringify(update));

    // Make non-mutating copy of tasks
    let tasks = this.state.tasks.slice(0);

    // Update all changed fields
    update.foreach((v, k) => {
      tasks[task.id][k] = v;
    });
    // Update state
    this.setState({ tasks: tasks });
  }
  deleteTask (task) {
    // TBD... may need to switch tasks to dictionary...
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
