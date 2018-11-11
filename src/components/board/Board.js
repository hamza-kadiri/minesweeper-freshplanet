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
      flags: 0,
    };
  }

  componentDidMount() {
    this.initGame(9, 9, 10, 10);
  }

  initGame = (nX, nY, nMines, nFlags) => {
    const newGrid = this.createEmptyGrid(nX, nY);
    const minedCells = this.getMinedCells(nX, nY, nMines);
    const finalGrid = this.populateGridWithMines(
      nX,
      nY,
      newGrid,
      minedCells,
      nMines,
    );
    console.log(finalGrid);
    this.setState({
      grid: finalGrid,
      finishedGame: false,
      currentnMines: nMines,
    });
  };

  getMinedCells = (nX, nY, nMines) => {
    const minedCells = [];
    while (minedCells.length < nMines) {
      const x = this.getRandomInt(0, nX);
      const y = this.getRandomInt(0, nY);
      if (!minedCells.some(v => v[0] === x && v[1] === y)) {
        minedCells.push([x, y]);
      }
    }
    return minedCells;
  };

  getRandomInt = (arg1, arg2) => {
    const min = Math.ceil(arg1);
    const max = Math.floor(arg2);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  getAdjacentCells = (nX, nY, x, y) => {
    let adjacentCells = [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 1, y],
      [x + 1, y - 1],
      [x, y - 1],
    ];
    adjacentCells = adjacentCells.filter(
      pt => pt[0] >= 0 && pt[1] >= 0 && pt[0] < nX && pt[1] < nY,
    );
    return adjacentCells;
  };

  populateGridWithMines = (nX, nY, initialGrid, minedCells, nMines) => {
    const grid = initialGrid;
    for (let i = 0; i < nMines; i += 1) {
      const x = minedCells[i][0];
      const y = minedCells[i][1];
      const adjacentCells = this.getAdjacentCells(nX, nY, x, y);
      adjacentCells.forEach(pt => {
        const z = pt[0];
        const w = pt[1];
        grid[z][w].adjacentMines += 1;
      });
      grid[x][y].mined = true;
    }
    const finalGrid = grid.map(row =>
      row.map(cell => ({ ...cell, clicked: true })),
    );
    console.log(finalGrid);
    return finalGrid;
  };

  createEmptyGrid = (nX, nY) => {
    const newGrid = [];
    for (let i = 0; i < nX; i += 1) {
      const subGrid = [];
      for (let j = 0; j < nY; j += 1) {
        subGrid.push({
          x: i,
          y: j,
          mined: false,
          clicked: false,
          adjacentMines: 0,
        });
      }
      newGrid.push(subGrid);
    }
    return newGrid;
  };

  handleCellClick = (x, y) => {
    const { grid, finishedGame } = this.state;
    if (!finishedGame) {
      const cell = grid[x][y];
      cell.clicked = true;
      if (cell.mined) {
        console.log('You Lose !');
        this.handleLose();
      }
      this.setState({ grid });
    }
  };

  handleLose = () => null;

  render() {
    const { grid, flags, finishedGame } = this.state;

    return (
      <Grid item className="grid">
        {grid.map((row, i) => (
          <Grid container key={`row-${i}`} justify="center" spacing={0}>
            {row.map((cell, j) => (
              <Cell
                key={`row-${cell.x}-${cell.y}`}
                x={cell.x}
                y={cell.y}
                mined={cell.mined}
                clicked={cell.clicked}
                adjacentMines={cell.adjacentMines}
                finishedGame={finishedGame}
                handleCellClick={this.handleCellClick}
              />
            ))}
          </Grid>
        ))}
      </Grid>
    );
  }
}
