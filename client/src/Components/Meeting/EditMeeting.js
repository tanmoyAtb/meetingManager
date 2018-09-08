import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DateTimePicker from '../DatePicker/DateTimePicker';
import styles from './addMeetingStyle.js';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Select from 'react-select';
import moment from 'moment';

import Axios from 'Utils/Axios';
import Helpers from 'Utils/Helpers';

class EditMeeting extends Component {
  constructor(props) {
      super(props);
      const { meeting } = props;

      const attendees = []; 
      meeting.attendees.forEach(function(attendee){
        attendees.push({id: attendee._id, value: attendee.username, label: attendee.name});
      })


      this.state = {
          open: false,
          rtl: true,
          attendees: attendees,
          datetime: new Date(meeting.datetime),
          datetime_from: new Date(meeting.datetime_from),
          datetime_to: new Date(meeting.datetime_to),
          client: meeting.client,
          organization: meeting.organization,
          title: meeting.title,
          location: meeting.location,
          description: meeting.description,
          summary: meeting.summary,
          attendees_options: []

      };


  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  meetingUserChange = (selectedOption) => {
        this.setState({attendees: selectedOption});
  }

  dateChange = (date) => {
    console.log(date);
    this.setState({datetime: date});
  }

  timeFromChange = (e) => {
    this.setState({datetime_from: moment(e.target.value, 'HH:mm').toDate()});
  }

  timeToChange = (e) => {
    this.setState({datetime_to: moment(e.target.value, 'HH:mm').toDate()});
  }

  titleChange = (e) => {
    this.setState({title: e.target.value});
  }

  clientChange = (e) => {
    this.setState({client: e.target.value});
  }

  organizationChange = (e) => {
    this.setState({organization: e.target.value});
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

  editMeeting = (e) => {
    const states = this.state;
    if(states.datetime && states.title && states.client && states.location && states.attendees.length && states.description){
       this.props.onEditMeeting(states);
    }
  }

  componentDidMount() {
      let that=this;
      Axios.getUsersList(function(err, data){
        if (err) return;
        else {
          that.setState({attendees_options: data.users});
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
              Edit Meeting
          </Typography>
          <div  className={classes.spacing}>
            <DateTimePicker big dateTimeChange={this.dateChange} date={this.state.datetime} time={this.state.datetime}/>
          </div>


          <div style={{display: 'flex'}}  className={classes.spacing}>
            <TextField
              id="time"
              label="Time From"
              type="time"
              defaultValue={this.props.meeting.datetime_from && Helpers.format_time_string(new Date(this.props.meeting.datetime_from))}
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
              defaultValue={this.props.meeting.datetime_to && Helpers.format_time_string(new Date(this.props.meeting.datetime_to))}
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
            defaultValue={this.props.meeting.title}
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
            defaultValue={this.props.meeting.client}
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
            defaultValue={this.props.meeting.organization}
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
            defaultValue={this.props.meeting.location}
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
                  onChange={this.meetingUserChange}
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
            defaultValue={this.props.meeting.description}
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
            margin="normal"
            placeholder="Description"
            style={{maxWidth: 600}}
          />

          <Button variant="contained" style= {{maxWidth: 220, marginBottom: 240}} onClick={this.editMeeting} color="primary" className={classes.spacing}>
              Edit Meeting
          </Button>
        
      </div>
    );
  }
}

export default withStyles(styles)(EditMeeting);
