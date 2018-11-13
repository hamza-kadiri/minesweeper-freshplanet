import React, { Component } from 'react';
import propTypes from 'prop-types';
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FlagIcon from '@material-ui/icons/Flag';
import RestartIcon from '@material-ui/icons/Autorenew';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Timer from '../timer/Timer';

export default class Header extends Component {
  render() {
    const {
      flags,
      setDifficulty,
      finishedGame,
      setRestartGame,
      difficulty,
      restartGame,
    } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <FormControl>
                <InputLabel
                  style={{ color: 'white' }}
                  shrink
                  htmlFor="difficulty-label-placeholder"
                >
                  Difficulty
                </InputLabel>
                <Select
                  style={{ color: 'white' }}
                  value={difficulty}
                  name="difficulty"
                  onChange={e => setDifficulty(e.target.value)}
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <IconButton
              aria-label="Restart"
              onClick={() => setRestartGame(true)}
            >
              <RestartIcon style={{ color: 'white', marginRight: '0.3em' }} />
            </IconButton>

            <Avatar
              style={{
                backgroundColor: 'transparent',
              }}
              aria-label="Flag"
            >
              <FlagIcon />
            </Avatar>
            <Typography variant="h5" color="inherit">
              {flags}
            </Typography>
            <Timer finishedGame={finishedGame} restartGame={restartGame} />
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  flags: propTypes.number.isRequired,
  finishedGame: propTypes.bool.isRequired,
  setDifficulty: propTypes.func.isRequired,
  setRestartGame: propTypes.func.isRequired,
  restartGame: propTypes.bool.isRequired,
  difficulty: propTypes.string.isRequired,
};
