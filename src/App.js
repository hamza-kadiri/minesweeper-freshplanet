import React, { Component } from 'react';
import './App.css';
import Board from './components/board';
import Header from './components/header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedGame: false,
      restartGame: false,
      difficulty: 'easy',
      flags: 10,
    };
  }

  setFlags = nFlags => {
    this.setState({ flags: nFlags });
  };

  setFinishedGame = bool => {
    this.setState({ finishedGame: bool });
  };

  setRestartGame = bool => {
    this.setState({ restartGame: bool });
  };

  setDifficulty = string => {
    this.setState({ difficulty: string });
  };

  render() {
    const { difficulty, flags, finishedGame, restartGame } = this.state;
    return (
      <div className="App">
        <div className="header">
          <Header
            flags={flags}
            finishedGame={finishedGame}
            setRestartGame={this.setRestartGame}
            setDifficulty={this.setDifficulty}
            difficulty={difficulty}
          />
        </div>
        <div className="Board">
          <Board
            difficulty={difficulty}
            setFlags={this.setFlags}
            setFinishedGame={this.setFinishedGame}
            restartGame={restartGame}
            setRestartGame={this.setRestartGame}
          />
        </div>
      </div>
    );
  }
}

export default App;
