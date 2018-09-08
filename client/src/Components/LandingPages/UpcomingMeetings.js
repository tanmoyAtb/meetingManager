import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Loader from 'Components/Loader/Loader';
import Card from '../Card/Card';
import Axios from 'Utils/Axios';
import DateRadio from '../Body/DateRadio'

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




class Ongoing extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {

    if(this.props.mode === 'wait'){
      return (
          <Loader/>
        )
    }
    else{
      return (
        <div style={{marginTop: 24, padding: 2}}>
          <DateRadio onDateChange = {this.props.onDateChange} users={this.props.users} userChange={this.props.onUserChange} user={this.props.user}/>
          {!this.props.meetings.length && "No Upcoming Meetings"

          }
          {this.props.meetings && 
            this.props.meetings.map(function(meeting){
              return (
                  <Card showDate key={meeting._id} meeting={meeting} />
                )
            })
          }
        </div>
      );
    }
  }
}

export default withStyles(styles)(Ongoing);
