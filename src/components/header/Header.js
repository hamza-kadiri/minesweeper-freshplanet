import React, { Component } from 'react';
import propTypes from 'prop-types';
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FlagIcon from '@material-ui/icons/Flag';
import TimerIcon from '@material-ui/icons/Timer';
import RestartIcon from '@material-ui/icons/Autorenew';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

export default class Header extends Component {
  render() {
    const { flags, setDifficulty, finishedGame, setRestartGame } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" justify="center">
            <Grid item style={{ flexGrow: 0.2 }}>
              <FormControl>
                <InputLabel
                  style={{ color: 'white' }}
                  shrink
                  htmlFor="difficulty-label-placeholder"
                >
                  Difficulty
                </InputLabel>
                <Select style={{ color: 'white' }} value={1} name="difficulty">
                  <MenuItem value={1}>Easy</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item style={{ flexGrow: 0.2 }}>
              {finishedGame ? (
                <Button
                  variant="extendedFab"
                  aria-label="Restart"
                  onClick={() => setRestartGame(true)}
                >
                  <RestartIcon
                    color="primary"
                    style={{ marginRight: '0.3em' }}
                  />
                  <Typography variant="button" color="primary">
                    Restart
                  </Typography>
                </Button>
              ) : null}
            </Grid>
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
            <Avatar
              style={{ backgroundColor: 'transparent' }}
              aria-label="Timer"
            >
              <TimerIcon />
            </Avatar>
            <Typography variant="h5" color="inherit">
              0
            </Typography>
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
};
