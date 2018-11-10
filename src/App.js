import React, { Component } from 'react';
import './App.css';
import Board from './components/board';
import Header from './components/header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <Header />
        </div>
        <div className="Board">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
