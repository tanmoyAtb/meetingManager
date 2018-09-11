import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Helpers from 'Utils/Helpers';
import TextField from '@material-ui/core/TextField';


import Axios from 'Utils/Axios';


function Transition(props) {
  return <Slide direction="down" {...props} />;
}


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

      let note = "";
      if(props.tender && props.tender.note) note = props.tender.note;

      this.state = {
        openRewarded : false,
        openDropped : false, 
        openBought : false,
        editNote : false,
        note: note
      };

  }  

  onScheduleBought = () => {
    this.setState({ openBought: true });
  }

  onScheduleDropped = () => {
    this.setState({ openDropped: true }); 
  }

  onWorkRewarded = () => {
    this.setState({ openRewarded: true });
  }

  handleCloseRewarded = () => {
    this.setState({ openRewarded: false });
  } 

  handleCloseDropped = () => {
    this.setState({ openDropped: false });
  } 

  handleCloseBought = () => {
    this.setState({ openBought: false });
  }
  
  handleEditClose = () => {
    this.setState({ editNote: false });
  } 

  onEditNote = (e) => {
    this.setState({ editNote: true });
  }

  noteChange = (e) => {
    this.setState({ note: e.target.value });
  } 

  handleEditDone = () => {
    let that = this;

    Axios.onEditNote(this.props.tender._id, this.state.note, function(err, data){
      if(err) {
          console.log(err);
          if(err.includes("unauthorized")) that.history.push("/");
      }
      else{
        that.handleEditClose();
        that.props.onEditNote(data.tender._id, data.tender.note);
      }
    })
  }

  handleBoughtConfirm = () => {
    let that = this;
    Axios.updateScheduleBought(this.props.tender._id, function(err, tender){
      if(err) {
          console.log(err);
          if(err.includes("unauthorized")) that.history.push("/");
      }
      else{
        that.handleCloseBought();
        that.props.onBoughtSchedule();
      }
    })  
  }

  handleDroppedConfirm = () => {
    let that = this;
    Axios.updateScheduleDropped(this.props.tender._id, function(err, tender){
      if(err) {
          console.log(err);
          if(err.includes("unauthorized")) that.history.push("/");
      }
      else{
        that.handleCloseDropped();
        that.props.onDroppedSchedule();
      }
    })  
  }

  handleRewardedConfirm = () => {
    let that = this;
    Axios.updateWorkRewarded(this.props.tender._id, function(err, tender){
      if(err) {
          console.log(err);
          if(err.includes("unauthorized")) that.history.push("/");
      }
      else{
        that.handleCloseRewarded();
        that.props.onRewardedWork();
      }
    })  
  }


  makeControls = () => {
  	const {tender, mode} = this.props;
  	if(!tender.schedule_bought && mode === 'ongoing'){
  		return (
  				<div style={{display: 'flex'}}>
		            <Button variant="contained" size="small" color="primary" onClick={this.onScheduleBought} >
	                	Schedule Bought
	                </Button>
	          </div>
  			)
  	}
  	else if(!tender.schedule_dropped && mode === 'bought'){
  		return (
  				<div style={{display: 'flex'}}>
		            <Button variant="contained" size="small" color="primary" onClick={this.onScheduleDropped}>
	                	Schedule Dropped
	                </Button>
	          </div>
  			)
  	}
  	else if(!tender.work_rewarded && mode === 'dropped'){
  		return (
  				<div style={{display: 'flex'}}>
		            <Button variant="contained" size="small" color="primary" onClick={this.onWorkRewarded}>
	                	Work Rewarded
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
            <div style={{display: 'flex', marginTop: 16}}>
              <div>
                <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                    Client : 
                </Typography>
                <Typography variant="display1" style={{color: '#263238', marginBottom: 16, fontSize: 20, fontWeight: 'bold'}} >
                    {tender.client}
                </Typography>

              </div>
              {tender.link &&
                  <Button variant="outlined" size="small" color="primary" href={link} style={{marginLeft: 24, maxHeight: 40}}>
                      Link
                    </Button>
                }
            </div>

            <div>
              <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                  Work : 
              </Typography>
              <Typography variant="display1" style={{color: '#263238', marginBottom: 20, fontSize: 20, fontWeight: 'bold'}} >
                  {tender.work}
              </Typography>
            </div>

            <div style={{display: 'flex', flexWrap: 'wrap'}}>
            	<div style={{marginRight: 16}}>
            	  <Typography variant="display1" style={{color: '#263238', fontSize: 12}} >
	                  Published Date 
	              </Typography>
	              <div style={{display: 'flex'}}>
		              <Typography variant="display1" style={{color: '#263238', fontSize: 24, paddingRight: 110}} >
		                  {Helpers.format_date(new Date(tender.published_datetime))} 
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
		              <Typography variant="display1" style={{color: '#263238', fontSize: 24, paddingLeft: 8, marginBottom: 16}} >
	                      {Helpers.format_time(new Date(tender.opening_datetime))} 
	              	  </Typography>
              	  </div>
              	</div>
            </div>
              
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
	                Security money
	            </Typography>
	            <Typography variant="display1" style={{color: '#263238', marginBottom: 30, fontSize: 20}} >
	                {tender.security_money + " TK"} 
	            </Typography>
	          </div>
          </div>

          <div style={{display: 'flex'}}>
            <div>
              <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                  Note : 
              </Typography>
              <Typography variant="display1" style={{color: '#263238', marginBottom: 30, fontSize: 20}} >
                  {tender.note}
              </Typography>

            </div>
            <Button variant="outlined" size="small" color="primary" onClick={this.onEditNote} style={{marginLeft: 24, maxHeight: 40}}>
              Edit
            </Button>
          </div>

          {this.makeControls()}

          <div style={{display: 'flex', marginTop: 8}}>
            {tender.schedule_bought &&
              <Typography variant="display1" style={{color: '#263238', fontSize: 18, marginRight: 16}} >
                    <i className="fa fa-check" style={{color: 'green'}}></i> Schedule bought 
              </Typography>
            }
            {tender.schedule_dropped &&
              <Typography variant="display1" style={{color: '#263238', fontSize: 18, marginRight: 16}} >
                    <i className="fa fa-check" style={{color: 'green'}}></i> Schedule dropped 
              </Typography>
            }
            {tender.work_rewarded && 
              <Typography variant="display1" style={{color: '#263238', fontSize: 18, marginRight: 16}} >
                    <i className="fa fa-check" style={{color: 'green'}}></i>  Work rewarded 
              </Typography>
            }
          </div>

          <Dialog
            open={this.state.editNote}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleEditClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{style: {flex: 1}}}
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Edit Note"}
            </DialogTitle>
            <DialogContent>
              <TextField
                id="multiline-static"
                onChange={this.noteChange}
                multiline
                rows="8"
                rowsMax="10"
                InputLabelProps={{
                  FormLabelClasses: {
                    root: classes.label,
                  },
                  shrink: true,
                  focused: false
                }}
                inputProps={{
                  step: 300, // 5 min
                  style: {marginTop: 8}
                }}
                defaultValue={tender.note}
                margin="normal"
                placeholder="Note"
                style={{maxWidth: 600, width: '100%'}}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleEditClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleEditDone} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.openBought}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleCloseBought}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{style: {flex: 1}}}
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Are You Sure"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.handleBoughtConfirm} color="primary">
                Yes
              </Button>
              <Button onClick={this.handleCloseBought} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.openDropped}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleCloseDropped}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{style: {flex: 1}}}
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Are You Sure"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.handleDroppedConfirm} color="primary">
                Yes
              </Button>
              <Button onClick={this.handleCloseDropped} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.openRewarded}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleCloseRewarded}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{style: {flex: 1}}}
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Are You Sure"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.handleRewardedConfirm} color="primary">
                Yes
              </Button>
              <Button onClick={this.handleCloseRewarded} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          
        </CardContent>
    </Card>
    );
  }
}

export default withStyles(styles)(CardTender);
