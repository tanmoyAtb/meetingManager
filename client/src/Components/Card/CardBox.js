import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from './Card';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: "8px 20%",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 12px",
    }
  },
});


class Body extends Component {

  render() {
  	const { classes } = this.props;

    return (
      <div>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    );
  }
}

export default withStyles(styles)(Body);
