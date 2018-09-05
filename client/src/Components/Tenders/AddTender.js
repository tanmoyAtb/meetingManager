import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DateTimePicker from '../DatePicker/DateTimePicker';
import styles from './addTenderStyle.js';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import Select from 'react-select';
import moment from 'moment';

import Axios from 'Utils/Axios';

class AddMeeting extends Component {
  constructor(props) {
        super(props);
        this.state = {
            open: false,
            rtl: true,
            attendees: [],
            date: new Date(),
            client: '',
            work: '',
            note: '',
            attendees_options: []
        };

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDone = () => {
    this.props.history.push("/");
  }

  meetingUserChange = (selectedOption) => {
        this.setState({attendees: selectedOption});
  }

  dateChange = (date) => {
    this.setState({date: date});
  }

  clientChange = (e) => {
    this.setState({client: e.target.value});
  }

  workChange = (e) => {
    this.setState({description: e.target.value});
  }

  noteChange = (e) => {
    this.setState({summary: e.target.value});
  }

  addMeeting = (e) => {
    const states = this.state;
    let that = this;
    if(states.date && states.time && states.title && states.client && states.location && states.attendees.length && states.description){
      console.log(states);
      let prevMeeting = {
        id: this.props.meeting._id,
        date: new Date(this.props.meeting.date),
        title: this.props.meeting.title,
        client: this.props.meeting.client
      };

      Axios.postNextMeeting(prevMeeting, states, function(err, meeting){
        if(err){
          console.log(err);
            if(err === 'unauthorized') that.props.history.push("/");
        }
        else {
          that.handleClickOpen();
        }
      })
    }
  }

  componentDidMount() {
      let that=this;
      Axios.getMeeting(function(err, data){
        if (err) return;
        else {
          that.setState({attendees_options: data.meetingUsers});
        }
      })
  }


  render() {
    const { classes } = this.props;

    const attendees = []; 
    this.state.attendees_options.forEach(function(attendee){
      attendees.push({id: attendee._id, value: attendee.username, label: attendee.name});
    })
    return (
      <div style={{display: 'flex', flexFlow: 'column'}}>
          <Typography variant="display1" style={{color: '#263238', marginBottom: 16}} gutterBottom>
              Add Tender 
          </Typography>
          <div  className={classes.spacing}>
            <DateTimePicker big label="Published Date" dateChange={this.dateChange}/>
          </div>

          <div  className={classes.spacing}>
            <DateTimePicker big label="Last Date" dateChange={this.dateChange}/>
          </div>

          <div  className={classes.spacing}>
            <DateTimePicker big label="Dropping Date" dateChange={this.dateChange}/>
          </div>

          <div  className={classes.spacing}>
            <DateTimePicker big label="Opening Date" dateChange={this.dateChange}/>
          </div>

          <TextField
            label="Client"
            required
            onChange={this.clientChange}
            className={classes.spacing}
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.label,
              },
              shrink: true,
              focused: false
            }}
            inputProps={{
                step: 300, 
                style: {marginTop: 8}
              }}
            placeholder="Client"
            style={{maxWidth: 600}}
          />

          <TextField
            id="multiline-static"
            label="Work"
            onChange={this.workChange}
            multiline
            rows="4"
            rowsMax="10"
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.label,
              },
              shrink: true,
              focused: false
            }}
            inputProps={{
                step: 300, 
                style: {marginTop: 8}
              }}
            className={classes.spacing}
            defaultValue=""
            margin="normal"
            placeholder="Work"
            style={{maxWidth: 600}}
          />

          <TextField
            id="multiline-static"
            label="Note"
            onChange={this.noteChange}
            multiline
            rows="4"
            rowsMax="10"
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.label,
              },
              shrink: true,
              focused: false
            }}
            inputProps={{
                step: 300, 
                style: {marginTop: 8}
              }}
            className={classes.spacing}
            defaultValue=""
            margin="normal"
            placeholder="Note"
            style={{maxWidth: 600}}
          />
          <div style={{display: 'flex'}}>
            <TextField
              label="Schedule Money"
              required
              type="number"
              onChange={this.clientChange}
              className={classes.spacing}
              InputLabelProps={{
                FormLabelClasses: {
                  root: classes.label,
                },
                shrink: true,
                focused: false
              }}
              inputProps={{
                  step: 300, 
                  style: {marginTop: 8}
                }}
              placeholder="Client"
              style={{maxWidth: 292, flex: 1}}
            />

            <TextField
              label="Security Money"
              required
              type="number"
              onChange={this.clientChange}
              className={classes.spacing}
              InputLabelProps={{
                FormLabelClasses: {
                  root: classes.label,
                },
                shrink: true,
                focused: false
              }}
              inputProps={{
                  step: 300, 
                  style: {marginTop: 8}
                }}
              placeholder="Client"
              style={{maxWidth: 292, marginLeft: 16, flex: 1}}
            />
          </div>


          <div style={{display: 'flex'}}>
            <Button variant="contained" style= {{maxWidth: 220, marginRight: 16, marginBottom: 240}} onClick={this.addMeeting} color="primary" className={classes.spacing}>
                Add Tender
            </Button>
            <Button variant="contained" style= {{maxWidth: 220, marginBottom: 240}} onClick={this.props.closeAddTender} color="primary" className={classes.spacing}>
                Cancel
            </Button>
          </div>


          <Dialog
              open={this.state.open}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              PaperProps={{style: {flex: 1}}}
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Meeting Added Successfully"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={this.handleDone} color="primary">
                  Done
                </Button>
              </DialogActions>
            </Dialog>
        
      </div>
    );
  }
}

export default withStyles(styles)(AddMeeting);
