import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import './Cell.css';

export default class Cell extends Component {
  render() {
    return (
      <Grid item>
        <Paper className="cell" />
      </Grid>
    );
  }
}
