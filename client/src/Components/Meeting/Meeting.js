import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from './meetingStyle';

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }


  render() {
    const { classes } = this.props;
    let title = "Meeting with Agroni";
    let date = "02/07/2018";
    let time = "04:00 PM";
    let timeStart = "03:00 PM";
    let timeStop = "05:30 PM";
    let client = "Agroni Bank";
    let location = "Paltan, In front Fars, Swopno"
    let attendees = "Tanmoy, RC, Ratul";
    let description = "The Quick brown fox jumped over the lazy dog";
    let summary = "Okay Thats Great";
    return (
      <div >
        <Header/>
        <div className={classes.container}>
          <div style={{display: 'flex'}}>
            <div style={{flex: 1}}>
              <Button variant="outlined" size="small" disabled color="primary" >
                Print
              </Button>
            </div>
            <Button variant="outlined" size="small" color="primary" >
              Edit
            </Button>
            <Button variant="outlined" size="small" color="primary">
              Done
            </Button>
          </div>



          <div style={{marginTop: 16}}>
            <div>
              <Typography variant="display1" style={{color: '#263238', fontSize: 30}} >
                  {title}
              </Typography>
            </div>
            <div>
              <Typography variant="display1" style={{color: '#3d81a9', marginBottom: 30, fontSize: 20}} >
                  {attendees}
              </Typography>
            </div>


            <div style={{display: 'flex'}}>
              <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
                  {date} 
              </Typography>
              <Typography variant="display1" style={{color: '#263238', fontSize: 24, paddingLeft: 16}} >
                   {time}
              </Typography>
            </div>
            <div>
              <Typography variant="display1" style={{color: '#546E7A', marginBottom: 30, fontSize: 16, fontStyle: 'italic'}} >
                  {timeStart} - {timeStop}
              </Typography>
            </div>


            <div>
              <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                  Client : 
              </Typography>
              <Typography variant="display1" style={{color: '#263238', marginBottom: 30, fontSize: 20}} >
                  {client}
              </Typography>
            </div>
            <div>
              <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                  Location : 
              </Typography>
              <Typography variant="display1" style={{color: '#263238',  marginBottom: 30, fontSize: 20}} >
                  {location}
              </Typography>
            </div>


            <div>
              <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                  Description : 
              </Typography>
            </div>
            <div>
              <Typography variant="display1" style={{color: '#263238',  marginBottom: 30, fontSize: 18}} >
                  {description}
              </Typography>
            </div>


            <div>
              <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                  Summary : 
              </Typography>
            </div>
            <div>
              <Typography variant="display1" style={{color: '#263238',  marginBottom: 36, fontSize: 18}} >
                  {summary}
              </Typography>
            </div>

            
            <div style={{display: 'flex'}}>
              <Button variant="outlined" size="small" color="primary" className={classes.button} >
                Previous
              </Button>
              <Button variant="outlined" size="small" color="primary" className={classes.button} >
                Next
              </Button>
            </div>



          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Meeting);
