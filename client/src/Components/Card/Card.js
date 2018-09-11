import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Helpers from 'Utils/Helpers';

const styles = {
  card: {
    minWidth: 275,
    marginTop: 8,
    border: '1px solid #CFD8DC'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class Layout extends Component {
  constructor(props) {
        super(props);
        this.state = {
          
        };

  }

  componentDidMount() {
      
  }


  render() {
    const { classes, meeting } = this.props;

    let attendees = "";

    let counter=0;
    let len = meeting.attendees.length;
    meeting.attendees.forEach(function(attendee){
      attendees += attendee.name;
      counter++;
      if(counter<len) attendees += ", ";
    })

    return (
      <Card className={classes.card}>
        <CardContent style={{padding: 16}}>
          <div>
            <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
                {meeting.title}
            </Typography>
          </div>
          <div>
            <Typography variant="display1" style={{color: '#3d81a9', marginBottom: 16, fontSize: 16}} >
                {attendees}
            </Typography>
          </div>
          <div style={{display: 'flex'}}>
            
              {this.props.showDate &&
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex'}}>
                      <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
                          {Helpers.format_date(new Date(meeting.datetime))} 
                      </Typography>
                      <Typography variant="display1" style={{color: '#263238', fontSize: 24, paddingLeft: 16}} >
                           {Helpers.format_time(new Date(meeting.datetime))} 
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="display1" style={{color: '#546E7A', marginBottom: 16, fontSize: 16, fontStyle: 'italic'}} >
                          {meeting.datetime_from && Helpers.format_time(new Date(meeting.datetime_from))} - {meeting.datetime_to && Helpers.format_time(new Date(meeting.datetime_to))} 
                      </Typography>
                    </div>
                  </div>
              }

              {!this.props.showDate && 
                <div style={{flex: 1}}>
                  <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
                   {Helpers.format_time(new Date(meeting.datetime))}
                  </Typography>
                  <Typography variant="display1" style={{color: '#546E7A', marginBottom: 8, fontSize: 16, fontStyle: 'italic'}} >
                      {meeting.time_from && Helpers.format_time(new Date(meeting.time_from))} - {meeting.time_to && Helpers.format_time(new Date(meeting.time_to))} 
                  </Typography>
                </div>
              }
            
              <Button variant="outlined" size="small" color="primary" href={`/meeting/${meeting._id}`}>
                Details
              </Button>
          </div>

          


          <div>
            <Typography variant="display1" style={{color: '#263238', fontSize: 20}} >
                {meeting.client}
            </Typography>
          </div>
          <div>
            <Typography variant="display1" style={{color: '#263238', fontSize: 16}} >
                {meeting.organization}
            </Typography>
          </div>
          <div>
            <Typography variant="display1" style={{color: '#263238', fontSize: 16}} >
                {meeting.location}
            </Typography>
          </div>
          
        </CardContent>
    </Card>
    );
  }
}

export default withStyles(styles)(Layout);
