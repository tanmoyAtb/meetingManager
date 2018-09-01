import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import DatePicker from '../DatePicker/DatePicker';
import styles from './addMeetingStyle.js';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from 'react-select';

class AddMeeting extends Component {
  constructor(props) {
        super(props);
        this.state = {
            rtl: true,
            option_cuisine: '',
        };

  }

  handleCuisineChange = (selectedOption) => {
        //console.log(selectedOption);
        this.setState({option_cuisine: selectedOption});
    }


  render() {
    const { classes } = this.props;

    const option_cuisine = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ];

    return (
      <div className={classes.container}>
          <Typography variant="display1" style={{color: '#263238', marginBottom: 16}} gutterBottom>
              Add Meeting
          </Typography>
          <div  className={classes.spacing}>
            <DatePicker big/>
          </div>

          <TextField
            id="time"
            label="Time"
            type="time"
            defaultValue="10:00"
            className={classes.spacing}
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.label,
              },
              focused: false
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            InputProps= {{
              style: {marginTop: 8}
            }}
            style={{maxWidth: 600}}
          />

          <div style={{display: 'flex'}}  className={classes.spacing}>
            <TextField
              id="time"
              label="Time From"
              type="time"
              defaultValue="10:00"
              InputLabelProps={{
                FormLabelClasses: {
                  root: classes.label,
                },
                focused: false
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              InputProps= {{
                style: {marginTop: 8}
              }}
              style={{marginRight: 16, flex: 1, maxWidth: 292}}
            />
            <TextField
              id="time"
              label="Time To"
              type="time"
              defaultValue="12:00"
              InputLabelProps={{
                FormLabelClasses: {
                  root: classes.label,
                },
                focused: false
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              InputProps= {{
                style: {marginTop: 8}
              }}
              style={{flex: 1, maxWidth: 292}}
            />
          </div>

          <TextField
            label="Title"
            className={classes.spacing}
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.label,
              },
              shrink: true,
              focused: false
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            InputProps= {{
              style: {marginTop: 8}
            }}
            placeholder="Title"
            style={{maxWidth: 600}}
          />

          <TextField
            label="Client"
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.spacing}
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.label,
              },
              shrink: true,
              focused: false
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            InputProps= {{
              style: {marginTop: 8}
            }}
            placeholder="Client"
            style={{maxWidth: 600}}
          />

           <TextField
            id="multiline-flexible"
            label="Location"
            multiline
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.label,
              },
              shrink: true,
              focused: false
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            InputProps= {{
              style: {marginTop: 8}
            }}
            className={classes.spacing}
            rowsMax="4"
            margin="normal"
            placeholder="Location"
            style={{maxWidth: 600}}
          />

          <div className={classes.spacing} style={{maxWidth: 600}}>
            <label className={classes.label} style={{fontFamily: 'Helvetica', fontSize: 22}} htmlFor="Attendees">Attendees</label>
            <div style={{marginTop: 28}}>
              <Select
                  id="Attendees"
                  isMulti
                  onChange={this.handleCuisineChange}
                  options={option_cuisine}
                  placeholder="Select Attendee"
                  rtl={this.state.rtl}
                  simpleValue
                  value={this.state.option_cuisine}
                  
              />
            </div>
          </div>


          <TextField
            id="multiline-static"
            label="Description"
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
              step: 300, // 5 min
            }}
            InputProps= {{
              style: {marginTop: 8}
            }}
            className={classes.spacing}
            defaultValue=""
            margin="normal"
            placeholder="Description"
            style={{maxWidth: 600}}
          />

          <Button variant="contained" style= {{maxWidth: 220, marginBottom: 240}} color="primary" className={classes.spacing}>
              Add Meeting
          </Button>
        
      </div>
    );
  }
}

export default withStyles(styles)(AddMeeting);
