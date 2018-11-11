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
    const { x, y, mined, clicked, flagged, adjacentMines } = this.props;
    return (
      <Grid item>
        <Paper
          className="cell"
          x={x}
          y={y}
          style={
            clicked
              ? mined
                ? { background: this.colors.mined }
                : { background: this.colors.clicked }
              : { background: this.colors.cell[(x + y) % 2] }
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
};
