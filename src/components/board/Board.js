/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import Cell from '../cell';
import './Board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      flags: '10',
    };
  }

  componentDidMount() {
    this.setState({ grid: this.createEmptyGrid(9, 9) });
    this.setState({ flags: '11' });
  }

  createEmptyGrid = (nX, nY) => {
    const newGrid = [];
    for (let i = 0; i < nX; i += 1) {
      const subGrid = [];
      for (let j = 0; j < nY; j += 1) {
        subGrid.push({
          x: i,
          y: j,
          mined: false,
        });
      }
      newGrid.push(subGrid);
    }
    return newGrid;
  };

  render() {
    const { grid, flags } = this.state;

    return (
      <Grid item className="grid">
        {grid.map((row, i) => (
          <Grid container key={`row-${i}`} justify="center" spacing={0}>
            {grid.map((cell, j) => (
              <Cell key={`row-${i}-${j}`} />
            ))}
          </Grid>
        ))}
      </Grid>
    );
  }
}
