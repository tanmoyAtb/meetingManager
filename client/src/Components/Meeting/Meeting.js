import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Axios from 'Utils/Axios';
import Helpers from 'Utils/Helpers';
import EditMeeting from './EditMeeting';
import AddNextMeeting from './AddNextMeeting';
import Loader from 'Components/Loader/Loader';
import Card from '../Card/Card';

import styles from './meetingStyle';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting: null,
      open: false,
      summary: '',
      mode: 'wait'
    };

  }

  summaryChange = (e) => {
    this.setState({summary: e.target.value});
  }

  handleLogout = (e) => {
    let that = this;
    Axios.logout(function(){
      that.props.history.push('/');
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDone = () => {
    let that=this;
    Axios.updateDoneOneMeeting(this.props.match.params.id, this.state.summary, function(err, data){
      if(err) console.log(err)
      else {
        that.setState({meeting: data.meeting});
        that.handleClose();
      }
    })
  }

  handleShowDetails = () => {
    this.setState({mode: 'details'});
  }

  addNextMeeting = () => {
    this.setState({mode: 'addNextMeeting'});
  }

  editMeeting = () => {
    this.setState({mode: 'edit'});
  }

  onAddNextMeeting = (data) => {
    console.log(data);
    let prevMeeting = {
      id: this.state.meeting._id,
      date: new Date(this.state.meeting.date),
      title: this.state.meeting.title,
      client: this.state.meeting.client
    }
    let that=this;

    Axios.postNextMeeting(prevMeeting, data, function(err, meeting){
      if(err){
        console.log(err);
          if(err === 'unauthorized') that.props.history.push("/");
      }
      else {
        that.props.history.push("/");
      }
    })

  }

  onEditMeeting = (data) => {
    let that= this;
    Axios.editMeeting(this.props.match.params.id, data, function(err, data){
       if (err) {
          console.log(err);
          if(err === 'unauthorized') that.props.history.push("/");
        }
        else {
          if(data.meeting && data.meeting._id){
            that.setState({mode: 'details', meeting: data.meeting});
          }
        }
    })
  }

  deleteMeeting = () => {
    let that=this;
    Axios.deleteOneMeeting(this.props.match.params.id, function(err){
      if(err) {
        console.log(err);
      }
      else {
        that.props.history.push("/");
      }
    })
  }

  componentDidMount() {
      let that=this;
      Axios.getOneMeeting(this.props.match.params.id, function(err, data){
        if (err) {
          console.log(err);
          if(err === 'unauthorized') that.props.history.push("/");
        }
        else {
          if(data.meeting && data.meeting._id){
            that.setState({mode: 'details', meeting: data.meeting});
          }
        }
      })
  }


  render() {
    const { classes } = this.props;
    const { mode, meeting } = this.state;
    if(mode === 'wait'){
      return (
          <Loader/>
        )
    }
    else if(mode === 'details' && meeting){
      let attendees = "";

      let counter=0;
      let len = meeting.attendees.length;
      meeting.attendees.forEach(function(attendee){
        attendees += attendee.name;
        counter++;
        if(counter<len) attendees += ", ";
      })

      return (
        <div >
          <Header logout={this.handleLogout}/>
          <div className={classes.container}>
            <div style={{display: 'flex'}}>
              <div style={{flex: 1}}>
                <Button variant="outlined" size="small" disabled color="primary" >
                  Print
                </Button>
              </div>

              {!meeting.done && 
              <div>
                <Button variant="outlined" size="small" color="primary" onClick={this.deleteMeeting}>
                  Delete
                </Button>
                <Button variant="outlined" size="small" color="primary" onClick={this.editMeeting}>
                  Edit
                </Button>
                <Button variant="outlined" size="small" color="primary" onClick={this.handleClickOpen}>
                  Done
                </Button>
              </div>
              }

              {meeting.done && 
              <div>
                <Button variant="outlined" size="small" color="primary" onClick={this.handleClickOpen}>
                  Edit Summary
                </Button>
                <Button variant="outlined" size="small" color="primary" onClick={this.addNextMeeting}>
                  Add Next Meeting
                </Button>
              </div>
              } 
            </div>



            <div style={{marginTop: 16}}>
              <div>
                <Typography variant="display1" style={{color: '#263238', fontSize: 30}} >
                    {meeting.title} {meeting.done && <i className="fa fa-check" style={{color: 'green'}}></i> } 
                </Typography>
              </div>
              <div>
                <Typography variant="display1" style={{color: '#3d81a9', marginBottom: 30, fontSize: 20}} >
                    {attendees}
                </Typography>
              </div>


              <div style={{display: 'flex'}}>
                <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
                    {Helpers.format_date(new Date(meeting.date))} 
                </Typography>
                <Typography variant="display1" style={{color: '#263238', fontSize: 24, paddingLeft: 16}} >
                     {Helpers.format_time(new Date(meeting.time))} 
                </Typography>
              </div>
              <div>
                <Typography variant="display1" style={{color: '#546E7A', marginBottom: 30, fontSize: 16, fontStyle: 'italic'}} >
                    {meeting.time_from && Helpers.format_time(new Date(meeting.time_from))} - {meeting.time_to && Helpers.format_time(new Date(meeting.time_to))} 
                </Typography>
              </div>


              <div>
                <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                    Client : 
                </Typography>
                <Typography variant="display1" style={{color: '#263238', marginBottom: 30, fontSize: 20}} >
                    {meeting.client}
                </Typography>
              </div>
              <div>
                <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                    Location : 
                </Typography>
                <Typography variant="display1" style={{color: '#263238',  marginBottom: 30, fontSize: 20}} >
                    {meeting.location}
                </Typography>
              </div>


              <div>
                <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                    Description : 
                </Typography>
              </div>
              <div>
                <Typography variant="display1" style={{color: '#263238',  marginBottom: 30, fontSize: 18}} >
                    {meeting.description}
                </Typography>
              </div>

              {meeting.done &&
                <div>
                  <div>
                    <Typography variant="display1" style={{color: '#263238', fontSize: 14}} >
                        Summary : 
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="display1" style={{color: '#263238',  marginBottom: 36, fontSize: 18}} >
                        {meeting.summary}
                    </Typography>
                  </div>
                </div>
              }
              
              <div style={{display: 'flex', flexFlow: 'column'}}>
                {meeting.meeting_previous.id &&
                  <div>
                    <Button variant="outlined" size="small" color="primary" className={classes.button} href={`/meeting/${meeting.meeting_previous.id}`}>
                      Previous
                    </Button>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex'}}>
                        <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
                            {Helpers.format_date(new Date(meeting.meeting_previous.date))} 
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="display1" style={{color: '#546E7A', marginBottom: 30, fontSize: 16, fontStyle: 'italic'}} >
                            {meeting.meeting_previous.title} 
                        </Typography>
                        <Typography variant="display1" style={{color: '#546E7A', marginBottom: 30, fontSize: 16, fontStyle: 'italic'}} >
                            {meeting.meeting_previous.client} 
                        </Typography>
                      </div>
                    </div>
                  </div>
                }
                
                {meeting.meeting_next.id &&
                  <div>
                    <Button variant="outlined" size="small" color="primary" className={classes.button} href={`/meeting/${meeting.meeting_next.id}`}>
                      Next
                    </Button>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex'}}>
                        <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
                            {Helpers.format_date(new Date(meeting.meeting_next.date))} 
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="display1" style={{color: '#546E7A', marginBottom: 30, fontSize: 16, fontStyle: 'italic'}} >
                            {meeting.meeting_next.title} 
                        </Typography>
                        <Typography variant="display1" style={{color: '#546E7A', marginBottom: 30, fontSize: 16, fontStyle: 'italic'}} >
                            {meeting.meeting_next.client} 
                        </Typography>
                      </div>
                    </div>
                  </div>
                }
              </div>

              <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{style: {flex: 1}}}
              >
                <DialogTitle id="alert-dialog-slide-title">
                  {"Add Summary"}
                </DialogTitle>
                <DialogContent>
                  <TextField
                    id="multiline-static"
                    onChange={this.summaryChange}
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
                    defaultValue=""
                    margin="normal"
                    placeholder="Summary"
                    style={{maxWidth: 600, width: '100%'}}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleDone} color="primary">
                    Done
                  </Button>
                </DialogActions>
              </Dialog>



            </div>
          </div>
        </div>
      );
    }
    else if(mode === 'edit' && meeting) {
      return (
          <div>
            <Header logout={this.handleLogout}/>
            <div className={classes.container}>
              <Button variant="outlined" onClick={this.handleShowDetails} color="primary">
                Cancel
              </Button>
            </div>
            <EditMeeting meeting={meeting} onEditMeeting={this.onEditMeeting}/>
          </div>
        )
    }
    else if(mode === 'addNextMeeting' && meeting){
      return (
          <div>
            <Header logout={this.handleLogout}/>
            <div className={classes.container}>
              <Button variant="outlined" onClick={this.handleShowDetails} color="primary" style={{marginBottom: 16}}>
                Cancel
              </Button>
              <Typography variant="display1" style={{color: '#263238', fontSize: 24}} >
                  Previous Meeting
              </Typography>
              
              <Card showDate meeting={meeting} />
            </div>
            
            <AddNextMeeting meeting={this.state.meeting} history={this.props.history} addNextMeeting={this.onAddNextMeeting}/>
          </div>
        )
    }
    else {
      return (
          <div>
            <Header logout={this.handleLogout}/>
          </div>
        )
    }
  }
}

export default withStyles(styles)(Meeting);
