import React, { Component } from 'react';
import './Timer.css';
import { Avatar, Typography } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import propTypes from 'prop-types';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      start: 0,
    };
  }

  componentDidMount() {
    this.setState({ time: 0, start: Date.now() });
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    const { finishedGame, restartGame } = this.props;
    if (finishedGame && prevProps.finishedGame === false) {
      this.stopTimer();
    }
    if (restartGame && prevProps.restartGame === false) {
      this.resetTimer();
      this.stopTimer();
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  resetTimer() {
    this.setState({ time: 0, start: Date.now() });
  }

  startTimer() {
    this.timer = setInterval(
      () =>
        this.setState(prevState => ({
          time: Date.now() - prevState.start,
        })),
      1000,
    );
  }

  render() {
    const { time } = this.state;
    return (
      <React.Fragment>
        <Avatar style={{ backgroundColor: 'transparent' }} aria-label="Timer">
          <TimerIcon />
        </Avatar>
        <Typography variant="h5" color="inherit">
          {`${Math.floor(time / 1000)}s`}
        </Typography>
      </React.Fragment>
    );
  }
}
Timer.propTypes = {
  finishedGame: propTypes.bool.isRequired,
  restartGame: propTypes.bool.isRequired,
};
