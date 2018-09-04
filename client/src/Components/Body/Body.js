import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DateRadio from './DateRadio';
import CardBox from '../Card/CardBox';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: "column",
    padding: "16px 20%",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 12px",
    }
  },
});


class Body extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      meetings: []
    };
  }


  ComponentDidMount() {

  }


  render() {
  	const { classes } = this.props;
    return (
      <div className={classes.container}>
        <DateRadio onDateChange = {this.props.onDateChange} users={this.props.users} userChange={this.props.userChange} user={this.props.user}/>
        <CardBox meetings={this.props.meetings}/>
      </div>
    );
  }
}

export default withStyles(styles)(Body);
