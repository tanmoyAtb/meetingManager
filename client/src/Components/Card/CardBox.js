import React, { Component } from 'react';
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
    return (
      <div>
        {!this.props.meetings.length && "No Meetings"

        }
        {
          this.props.meetings.map(function(meeting){
            return (
                <Card key={meeting._id} meeting={meeting}/>
              )
          })
        }
      </div>
    );
  }
}

export default withStyles(styles)(Body);
