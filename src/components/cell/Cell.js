/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import { Grid, Paper } from '@material-ui/core';
import propTypes from 'prop-types';
import './Cell.css';

export default class Cell extends PureComponent {
  colors = {
    clicked: 'white',
    cell: ['#3f51b5ce', '#3f51b5c0'],
    mined: 'rgba(179, 38, 38, 0.719)',
  };

  style = {
    common: {
      border: '1px solid #3f51b5',
      float: 'left',
      marginRight: -1,
      marginTop: -1,
      padding: 0,
      textAlign: 'center',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  };

  cell = {
    easy: {
      ...this.style.common,
      fontSize: 22,
      lineHeight: '34px',
      height: 34,
      width: 34,
    },
    medium: {
      ...this.style.common,
      fontSize: 19,
      lineHeight: '27px',
      height: 27,
      width: 27,
    },
    hard: {
      ...this.style.common,
      fontSize: 16,
      lineHeight: '22px',
      height: 22,
      width: 22,
    },
  };

  getStyle = difficulty => {
    switch (difficulty) {
      case 'easy':
        return this.cell.easy;
      case 'medium':
        return this.cell.medium;
      case 'hard':
        return this.cell.hard;
      default:
        return this.cell.easy;
    }
  };

  handleClick = e => {
    const { handleCellClick } = this.props;
    const x = parseInt(e.currentTarget.getAttribute('x'), 10);
    const y = parseInt(e.currentTarget.getAttribute('y'), 10);
    handleCellClick(x, y);
  };

  handleFlag = e => {
    e.preventDefault();
    const { handleFlag } = this.props;
    const x = parseInt(e.currentTarget.getAttribute('x'), 10);
    const y = parseInt(e.currentTarget.getAttribute('y'), 10);
    handleFlag(x, y);
  };

  render() {
    const {
      x,
      y,
      mined,
      clicked,
      flagged,
      adjacentMines,
      difficulty,
      testing,
    } = this.props;
    return (
      <Grid item>
        <Paper
          x={x}
          y={y}
          style={
            clicked
              ? mined
                ? {
                    ...this.getStyle(difficulty),
                    background: this.colors.mined,
                  }
                : {
                    ...this.getStyle(difficulty),
                    background: this.colors.clicked,
                  }
              : mined && testing
              ? {
                  ...this.getStyle(difficulty),
                  background: this.colors.mined,
                }
              : {
                  ...this.getStyle(difficulty),
                  background: this.colors.cell[(x + y) % 2],
                }
          }
          onClick={this.handleClick}
          onContextMenu={this.handleFlag}
        >
          {clicked ? (
            mined ? (
              <span role="img" aria-label="bomb">
                💣
              </span>
            ) : adjacentMines > 0 ? (
              <div>{adjacentMines}</div>
            ) : null
          ) : flagged ? (
            <span role="img" aria-label="bomb">
              🚩
            </span>
          ) : null}
        </Paper>
      </Grid>
    );
  }
}

Cell.propTypes = {
  x: propTypes.number.isRequired,
  y: propTypes.number.isRequired,
  mined: propTypes.bool.isRequired,
  clicked: propTypes.bool.isRequired,
  flagged: propTypes.bool.isRequired,
  handleCellClick: propTypes.func.isRequired,
  handleFlag: propTypes.func.isRequired,
  adjacentMines: propTypes.number.isRequired,
  difficulty: propTypes.string.isRequired,
  testing: propTypes.bool.isRequired,
};
