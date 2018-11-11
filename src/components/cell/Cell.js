/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import propTypes from 'prop-types';
import './Cell.css';

export default class Cell extends Component {
  handleClick = e => {
    const { handleCellClick } = this.props;
    const x = parseInt(e.currentTarget.getAttribute('x'), 10);
    const y = parseInt(e.currentTarget.getAttribute('y'), 10);
    handleCellClick(x, y);
  };

  render() {
    const { x, y, mined, clicked } = this.props;
    return (
      <Grid item>
        <Paper
          className="cell"
          x={x}
          y={y}
          style={
            clicked
              ? mined
                ? { background: 'red' }
                : { background: 'grey' }
              : { background: 'light-grey' }
          }
          onClick={this.handleClick}
        />
      </Grid>
    );
  }
}

Cell.propTypes = {
  x: propTypes.number.isRequired,
  y: propTypes.number.isRequired,
  mined: propTypes.bool.isRequired,
  clicked: propTypes.bool.isRequired,
  handleCellClick: propTypes.func.isRequired,
};
