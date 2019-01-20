import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskView from './views/TaskView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TaskView tasks={[ 1, 2, 3, 4, 5 ]} />

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
