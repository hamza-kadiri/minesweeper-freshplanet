import React, { Component } from 'react';
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FlagIcon from '@material-ui/icons/Flag';
import TimerIcon from '@material-ui/icons/Timer';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { GameContext } from '../board/Board';

export default class Header extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" justify="center">
            <Grid item style={{ flexGrow: 0.5 }}>
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

            <Avatar
              style={{
                backgroundColor: 'transparent',
              }}
              aria-label="Flag"
            >
              <FlagIcon />
            </Avatar>
            <Typography variant="h5" color="inherit">
              0
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
