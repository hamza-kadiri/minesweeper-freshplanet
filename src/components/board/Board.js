/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './Board.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import request from 'request';
import Cell from '../cell';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      flags: 0,
      flaggedCells: [],
      testing: false,
      won: false,
      winningGif: '',
    };
  }

  componentDidMount() {
    this.initGame('easy');
    this.handleWin();
  }

  componentDidUpdate(prevProps) {
    const { restartGame, difficulty } = this.props;
    const { minedCells, flaggedCells } = this.state;
    if (prevProps.restartGame === false && restartGame === true) {
      this.initGame(difficulty);
    }
    if (prevProps.difficulty !== difficulty) {
      this.initGame(difficulty);
    }
  }

  initGame = difficulty => {
    let [nX, nY, nMines, nFlags] = [0, 0, 0, 0];
    switch (difficulty) {
      case 'easy':
        nX = 9;
        nY = 9;
        nMines = 10;
        nFlags = 10;
        break;
      case 'medium':
        nX = 12;
        nY = 12;
        nMines = 20;
        nFlags = 20;
        break;
      case 'hard':
        nX = 15;
        nY = 15;
        nMines = 40;
        nFlags = 40;
        break;
      default:
        nX = 9;
        nY = 9;
        nMines = 10;
        nFlags = 10;
    }
    const { setFlags, setFinishedGame, setRestartGame } = this.props;
    const newGrid = this.createEmptyGrid(nX, nY);
    const minedCells = this.getMinedCells(nX, nY, nMines);
    const finalGrid = this.populateGridWithMines(
      nX,
      nY,
      newGrid,
      minedCells,
      nMines,
    );
    this.setState({
      grid: finalGrid,
      finishedGame: false,
      flags: nFlags,
      minedCells,
    });
    setFlags(nFlags);
    setFinishedGame(false);
    setRestartGame(false);
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
    return grid;
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
          flagged: false,
          adjacentMines: 0,
        });
      }
      newGrid.push(subGrid);
    }
    return newGrid;
  };

  handleCellClick = (x, y) => {
    const { grid, finishedGame } = this.state;
    let unClickedCells = [];
    if (!finishedGame) {
      const cell = grid[x][y];
      if (!cell.flagged) {
        if (cell.mined) {
          this.handleFinish();
        } else if (cell.adjacentMines === 0 && cell.clicked === false) {
          cell.clicked = true;
          this.handleAdjacentCells(x, y);
        } else if (cell.adjacentMines > 0 && cell.clicked === false) {
          cell.clicked = true;
          this.setState({
            grid,
          });
          unClickedCells = grid.map(row => row.filter(c => !c.clicked));
          if (
            unClickedCells.every(row =>
              row.every(c => c.mined || c.adjacentMines === 0),
            )
          ) {
            this.handleWin();
          }
        }
      }
    }
  };

  handleAdjacentCells = (x, y) => {
    const { grid } = this.state;
    const nX = grid.length;
    const nY = nX;
    grid[x][y].clicked = true;
    const adjacentCells = this.getAdjacentCells(nX, nY, x, y);
    adjacentCells.forEach(pt => {
      const i = pt[0];
      const j = pt[1];
      if (!grid[i][j].clicked) {
        this.handleCellClick(i, j);
      }
    });
    this.setState({
      grid,
    });
  };

  handleFlag = (x, y) => {
    const { grid, finishedGame, minedCells } = this.state;
    let { flaggedCells } = this.state;
    let { flags } = this.state;
    const { setFlags } = this.props;
    if (!finishedGame) {
      const cell = grid[x][y];
      if (!cell.clicked) {
        if (cell.flagged) {
          cell.flagged = !cell.flagged;
          flaggedCells = flaggedCells.filter(c => !c.flagged);
          flags += 1;
        } else if (flags > 0) {
          cell.flagged = !cell.flagged;
          flaggedCells.push(cell);
          flags -= 1;
        }
        if (flags === 0) {
          if (minedCells.filter(c => !grid[c[0]][c[1]].flagged).length === 0) {
            this.handleWin();
          }
        }
        this.setState({
          grid,
          flags,
        });
        setFlags(flags);
      }
    }
  };

  handleFinish = () => {
    const { grid, finishedGame } = this.state;
    const { setFinishedGame } = this.props;
    const finalGrid = grid.map(row =>
      row.map(cell => ({ ...cell, clicked: true })),
    );
    this.setState({ finishedGame: !finishedGame, grid: finalGrid });
    setFinishedGame(true);
  };

  handleWin = async () => {
    const { winningGif } = this.state;
    this.handleFinish();
    this.setState({ won: true });
    const response = await fetch(
      'http://api.giphy.com/v1/gifs/search?q=you+did+it&api_key=RV173xTYbLny9laAlld5t3MpkcJxPS26',
    );
    const body = await response.json();
    const { data } = body;
    const index = this.getRandomInt(0, 25);
    this.setState({ winningGif: data[index].images.fixed_height.url });
  };

  handleChangeTesting = () => {
    const { testing } = this.state;
    this.setState({ testing: !testing });
  };

  render() {
    const { grid, finishedGame, testing, won, winningGif } = this.state;
    const { difficulty, setRestartGame } = this.props;

    return (
      <React.Fragment>
        <FormControlLabel
          control={
            <Switch
              checked={testing}
              onChange={this.handleChangeTesting}
              value="checkedB"
              color="primary"
            />
          }
          label="Test mode"
        />
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
                  flagged={cell.flagged}
                  adjacentMines={cell.adjacentMines}
                  finishedGame={finishedGame}
                  handleCellClick={this.handleCellClick}
                  handleFlag={this.handleFlag}
                  difficulty={difficulty}
                  testing={testing}
                />
              ))}
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={won}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'You won ! Congratulations !'}
          </DialogTitle>
          <DialogContent>
            <img
              src={winningGif}
              alt="winningGif"
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ won: false })}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={e => {
                this.setState({ won: false });
                setRestartGame(true);
              }}
              color="primary"
            >
              Restart
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

Board.propTypes = {
  setFlags: propTypes.func.isRequired,
  setFinishedGame: propTypes.func.isRequired,
  restartGame: propTypes.bool.isRequired,
  setRestartGame: propTypes.func.isRequired,
  difficulty: propTypes.string.isRequired,
};
