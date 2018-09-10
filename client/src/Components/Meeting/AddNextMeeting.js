import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DateTimePicker from '../DatePicker/DateTimePicker';
import styles from './addMeetingStyle.js';
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
            datetime: null,
            datetime_from: null,
            datetime_to: null,
            client: '',
            organization: '',
            title: '',
            location: '',
            description: '',
            summary: '',
            attendees_options: []
        };

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  attendeeChange = (selectedOption) => {
    this.setState({attendees: selectedOption});
  }

  dateTimeChange = (datetime) => {
    console.log(datetime);
    this.setState({datetime: datetime});
  }

  timeFromChange = (e) => {
    let time = moment(e.target.value, 'HH:mm');
    if(time.isValid()){
      this.setState({time_from: time.toDate()});
    }
  }

  timeToChange = (e) => {
    let time = moment(e.target.value, 'HH:mm');
    if(time.isValid()){
      this.setState({time_to: time.toDate()});
    }
  }

  titleChange = (e) => {
    this.setState({title: e.target.value});
  }

  clientChange = (e) => {
    this.setState({client: e.target.value});
  }

  organizationChange = (e) => {
    this.setState({ organization: e.target.value});
  }

  locationChange = (e) => {
    this.setState({location: e.target.value});
  }

  descriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  summaryChange = (e) => {
    this.setState({summary: e.target.value});
  }


  addMeeting = (e) => {
    const states = this.state;
    let that = this;
    if(states.datetime && states.title && states.client && states.location && states.attendees.length && states.description){
      console.log(states);
      let prevMeeting = {
        id: this.props.meeting._id,
        datetime: new Date(this.props.meeting.datetime),
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
    let that = this;
    Axios.getUsersList(function(err, data){
      if(err) {
        if(err.includes("unauthorized")) that.history.push("/");
      }
      else {
        console.log("users", data.users);
        that.setState({attendees_options : data.users});
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
      <div className={classes.container}>
          <Typography variant="display1" style={{color: '#263238', marginBottom: 16}} gutterBottom>
              Add Meeting
          </Typography>
          <div  className={classes.spacing}>
            <DateTimePicker big dateTimeChange={this.dateTimeChange}/>
          </div>

          <div style={{display: 'flex'}}  className={classes.spacing}>
            <TextField
              id="time"
              label="Time From"
              type="time"
              onChange={this.timeFromChange}
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
              style={{marginRight: 16, flex: 1, maxWidth: 292}}
            />
            <TextField
              id="time"
              label="Time To"
              type="time"
              onChange={this.timeToChange}
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
              style={{flex: 1, maxWidth: 292}}
            />
          </div>

          <TextField
            label="Title"
            required
            className={classes.spacing}
            onChange={this.titleChange}
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
            placeholder="Title"
            style={{maxWidth: 600}}
          />

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
            label="Organization"
            required
            onChange={this.organizationChange}
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
            placeholder="Organization"
            style={{maxWidth: 600}}
          />

           <TextField
            label="Location"
            required
            onChange={this.locationChange}
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
            placeholder="Location"
            style={{maxWidth: 600}}
          />

          <div className={classes.spacing} style={{maxWidth: 600}}>
            <label className={classes.label} style={{fontFamily: 'Helvetica', fontSize: 22}} htmlFor="Attendees">Attendees</label>
            <div style={{marginTop: 28}}>
              <Select
                  id="Attendees"
                  isMulti
                  onChange={this.attendeeChange}
                  options={attendees}
                  placeholder="Select Attendee"
                  rtl={this.state.rtl}
                  simpleValue
                  value={this.state.attendees}
                  
              />
            </div>
          </div>


          <TextField
            id="multiline-static"
            label="Description"
            onChange={this.descriptionChange}
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
            placeholder="Description"
            style={{maxWidth: 600}}
          />

          <Button variant="contained" style= {{maxWidth: 220, marginBottom: 240}} onClick={this.addMeeting} color="primary" className={classes.spacing}>
              Add Meeting
          </Button>


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
                <Button onClick={this.handleClose} color="primary">
                  Done
                </Button>
              </DialogActions>
            </Dialog>
        
      </div>
    );
  }
}

export default withStyles(styles)(AddMeeting);
