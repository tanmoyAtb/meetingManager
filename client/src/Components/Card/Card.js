import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
    const { classes} = this.props;

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
      <Card className={classes.card}>
        <CardContent style={{padding: 16}}>
          <div style={{display: 'flex'}}>
            <div style={{flex: 1}}>
              <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
                   {time}
              </Typography>
              <Typography variant="display1" style={{color: '#546E7A', marginBottom: 16, fontSize: 14, fontStyle: 'italic'}} >
                  {timeStart} - {timeStop}
              </Typography>
            </div>
            <Button variant="outlined" size="small" color="primary" >
              Details
            </Button>
          </div>
          <div>
            
          </div>

          <div>
            <Typography variant="display1" style={{color: '#263238', fontSize: 18}} >
                {title}
            </Typography>
          </div>
          <div>
            <Typography variant="display1" style={{color: '#3d81a9', marginBottom: 16, fontSize: 16}} >
                {attendees}
            </Typography>
          </div>


          <div>
            <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                {client}
            </Typography>
          </div>
          <div>
            <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                {location}
            </Typography>
          </div>
          
        </CardContent>
    </Card>
    );
  }
}

export default withStyles(styles)(Layout);
