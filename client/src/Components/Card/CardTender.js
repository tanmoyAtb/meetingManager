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
    marginTop: 24,
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


class CardTender extends Component {
  constructor(props) {
        super(props);
        this.state = {
          
        };

  }

  makeControls = () => {
  	const {tender} = this.props;
  	if(!tender.schedule_bought){
  		return (
  				<div style={{display: 'flex'}}>
		            <Button variant="contained" size="small" color="primary" href={tender.link} >
	                	Buy Schedule
	                </Button>
	          </div>
  			)
  	}
  	else if(!tender.schedule_dropped){
  		return (
  				<div style={{display: 'flex'}}>
		            <Button variant="contained" size="small" color="primary" href={tender.link}>
	                	Drop Schedule
	                </Button>
	          </div>
  			)
  	}
  	else if(!tender.work_ordered){
  		return (
  				<div style={{display: 'flex'}}>
		            <Button variant="contained" size="small" color="primary" href={tender.link}>
	                	Order Work
	                </Button>
	          </div>
  			)
  	}
  }

  render() {
    const { classes, tender } = this.props;
    let link = tender.link;
    if(link){
    	if (!link.includes('http')) {
		    link = 'http://' + link;
		}
    }
    

    return (
      <Card className={classes.card}>
        <CardContent style={{padding: 16}}>
          <div>
        
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
            	<div style={{marginRight: 16}}>
            	  <Typography variant="display1" style={{color: '#263238', fontSize: 12}} >
	                  Published Date 
	              </Typography>
	              <div style={{display: 'flex'}}>
		              <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
		                  {Helpers.format_date(new Date(tender.published_datetime))} 
		              </Typography>
		              <Typography variant="display1" style={{color: '#263238', fontSize: 24, paddingLeft: 8}} >
	                      {Helpers.format_time(new Date(tender.published_datetime))} 
	              	  </Typography>
              	  </div>
              	</div>

              	<div>
            	  <Typography variant="display1" style={{color: '#263238', fontSize: 12}} >
	                  Last Date 
	              </Typography>
	              <div style={{display: 'flex'}}>
		              <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
		                  {Helpers.format_date(new Date(tender.last_datetime))} 
		              </Typography>
		              <Typography variant="display1" style={{color: '#263238', fontSize: 24, paddingLeft: 8}} >
	                      {Helpers.format_time(new Date(tender.last_datetime))} 
	              	  </Typography>
              	  </div>
              	</div>
            </div>

            <div style={{display: 'flex', flexWrap: 'wrap', marginTop: 16}}>
            	<div style={{marginRight: 16}}>
            	  <Typography variant="display1" style={{color: '#263238', fontSize: 12}} >
	                  Dropping Date 
	              </Typography>
	              <div style={{display: 'flex'}}>
		              <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
		                  {Helpers.format_date(new Date(tender.dropping_datetime))} 
		              </Typography>
		              <Typography variant="display1" style={{color: '#263238', fontSize: 24, paddingLeft: 8}} >
	                      {Helpers.format_time(new Date(tender.dropping_datetime))} 
	              	  </Typography>
              	  </div>
              	</div>

              	<div>
            	  <Typography variant="display1" style={{color: '#263238', fontSize: 12}} >
	                  Opening Date 
	              </Typography>
	              <div style={{display: 'flex'}}>
		              <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
		                  {Helpers.format_date(new Date(tender.opening_datetime))} 
		              </Typography>
		              <Typography variant="display1" style={{color: '#263238', fontSize: 24, paddingLeft: 8}} >
	                      {Helpers.format_time(new Date(tender.opening_datetime))} 
	              	  </Typography>
              	  </div>
              	</div>
            </div>
              
          </div>

          <div style={{display: 'flex', marginTop: 16}}>
	          <div>
	            <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
	                Client : 
	            </Typography>
	            <Typography variant="display1" style={{color: '#263238', marginBottom: 30, fontSize: 20}} >
	                {tender.client}
	            </Typography>

	          </div>
	          {tender.link &&
	            	<Button variant="outlined" size="small" color="primary" href={link} style={{marginLeft: 24}}>
	                	Link
	                </Button>
	            }
          </div>

          <div>
            <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                Work : 
            </Typography>
            <Typography variant="display1" style={{color: '#263238', marginBottom: 30, fontSize: 20}} >
                {tender.work}
            </Typography>
          </div>

          <div>
            <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                Note : 
            </Typography>
            <Typography variant="display1" style={{color: '#263238', marginBottom: 30, fontSize: 20}} >
                {tender.Note}
            </Typography>
          </div>

          <div style={{display: 'flex'}}>
	          <div style={{marginRight: 16}}>
	            <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
	                Schedule money 
	            </Typography>
	            <Typography variant="display1" style={{color: '#263238', marginBottom: 30, fontSize: 20}} >
	                {tender.schedule_money + " TK"} 
	            </Typography>
	          </div>

	          <div>
	            <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
	                Schedule money
	            </Typography>
	            <Typography variant="display1" style={{color: '#263238', marginBottom: 30, fontSize: 20}} >
	                {tender.security_money + " TK"} 
	            </Typography>
	          </div>
          </div>

          {this.makeControls()}
          
        </CardContent>
    </Card>
    );
  }
}

export default withStyles(styles)(CardTender);
