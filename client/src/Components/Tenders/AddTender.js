import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DateTimePicker from '../DatePicker/DateTimePicker';
import DatePicker from '../DatePicker/DatePicker';
import styles from './addTenderStyle.js';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import moment from 'moment';

import Axios from 'Utils/Axios';

class AddTender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      datePublishedString: moment().format('DD/MM/YYYY'),
      dateLastString: moment().format('DD/MM/YYYY'),
      dateDroppingString: moment().format('DD/MM/YYYY'),
      dateOpeningString: moment().format('DD/MM/YYYY'),
      timeLastString: "",
      timeDroppingString: "",
      timeOpeningString: "",
      client: '',
      work: '',
      note: '',
      scheduleMoney: '',
      securityMoney: '',
      link: ''
    };
  }

  handleClickOpen = (e) => {
    this.setState({ open: true });
  }

  handleClose = (e) => {
    this.setState({ open: false });
  }

  handleDone = (e) => {
    this.setState({ open: false });
  }

  datePublishedChange = (datePublishedString) => {
    this.setState({datePublishedString: datePublishedString});
  }

  dateLastChange = (dateLastString) => {
    this.setState({dateLastString: dateLastString});
  }

  dateDroppingChange = (dateDroppingString) => {
    this.setState({dateDroppingString: dateDroppingString});
  }

  dateOpeningChange = (dateOpeningString) => {
    this.setState({dateOpeningString: dateOpeningString});
  }

  timeLastChange = (timeLastString) => {
    this.setState({timeLastString: timeLastString});
  }

  timeDroppingChange = (timeDroppingString) => {
    this.setState({timeDroppingString: timeDroppingString});
  }

  timeOpeningChange = (timeOpeningString) => {
    this.setState({timeOpeningString: timeOpeningString});
  }

  clientChange = (e) => {
    this.setState({client: e.target.value});
  }

  workChange = (e) => {
    this.setState({work: e.target.value});
  }

  noteChange = (e) => {
    this.setState({note: e.target.value});
  }

  scheduleMoneyChange = (e) => {
    this.setState({scheduleMoney: parseInt(e.target.value, 10)});
  }

  securityMoneyChange = (e) => {
    this.setState({securityMoney: parseInt(e.target.value, 10)});
  }

  linkChange = (e) => {
    this.setState({link: e.target.value});
  }

  addTender = (e) => {
    let states = this.state;
    let that = this;

    let datePublished = moment(states.datePublishedString, 'DD/MM/YYYY');

    let dateLast = moment(states.dateLastString, 'DD/MM/YYYY');
    let timeLast = moment(states.timeLastString, 'HH:mm');

    let dateDropping = moment(states.dateDroppingString, 'DD/MM/YYYY');
    let timeDropping = moment(states.timeDroppingString, 'HH:mm');

    let dateOpening = moment(states.dateOpeningString, 'DD/MM/YYYY');
    let timeOpening = moment(states.timeOpeningString, 'HH:mm');


    if(datePublished.isValid()) states.dateTimePublished = datePublished.toDate();

    if(dateLast.isValid() && timeLast.isValid()){
      states.dateTimeLast = dateLast.set({
          hour:   timeLast.get('hour'),
          minute: timeLast.get('minute')
      }).toDate();
    }

    if(dateDropping.isValid() && timeDropping.isValid()){
      states.dateTimeDropping = dateDropping.set({
          hour:   timeDropping.get('hour'),
          minute: timeDropping.get('minute')
      }).toDate();
    }

    if(dateOpening.isValid() && timeOpening.isValid()){
      states.dateTimeOpening = dateOpening.set({
          hour:   timeOpening.get('hour'),
          minute: timeOpening.get('minute')
      }).toDate();
    }

    if(states.dateTimePublished && states.dateTimeLast && states.dateTimeDropping && states.dateTimeOpening 
        && states.client && states.work){

      Axios.postTender(states, function(err, tender){
        if(err){
          console.log(err);
            if(err === 'unauthorized') that.props.history.push("/");
        }
        else {
          that.props.gotNewTender(tender);
          that.setState({ open: true,
            datePublishedString: moment().format('DD/MM/YYYY'),
            dateLastString: moment().format('DD/MM/YYYY'),
            dateDroppingString: moment().format('DD/MM/YYYY'),
            dateOpeningString: moment().format('DD/MM/YYYY'),
            timeLastString: "",
            timeDroppingString: "",
            timeOpeningString: "",
            client: '',
            work: '',
            note: '',
            scheduleMoney: '',
            securityMoney: '',
            link: ''
          });
        }
      })
    }
  }

  componentDidMount() {

  }


  render() {
    const { classes } = this.props;

    return (
      <div style={{display: 'flex', flexFlow: 'column', marginTop: 24, padding: 2}}>
          <Typography variant="display1" style={{color: '#263238', marginBottom: 16}} gutterBottom>
              Add Tender 
          </Typography>
          <div  className={classes.spacing}>
            <DatePicker dateString={this.state.datePublishedString} big label="Published Date" dateChange={this.datePublishedChange}/>
          </div>

          <div  className={classes.spacing}>
            <DateTimePicker big dateString={this.state.dateLastString} label="Last Date" timeString={this.state.timeLastString} 
                                timeChange={this.timeLastChange} dateChange={this.dateLastChange}/>
          </div>

          <div  className={classes.spacing}>
            <DateTimePicker big dateString={this.state.dateDroppingString} label="Dropping Date" timeString={this.state.timeDroppingString} 
                            timeChange={this.timeDroppingChange} dateChange={this.dateDroppingChange}/>
          </div>

          <div  className={classes.spacing}>
            <DateTimePicker big dateString={this.state.dateOpeningString} label="Opening Date" timeString={this.state.timeOpeningString} 
                            timeChange={this.timeOpeningChange} dateChange={this.dateOpeningChange}/>
          </div>

          <TextField
            label="Client"
            onChange={this.clientChange}
            className={classes.spacing}
            value={this.state.client}
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
            value={this.state.work}
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
            margin="normal"
            placeholder="Work"
            style={{maxWidth: 600}}
          />

          

          <div style={{display: 'flex'}}>
            <TextField
              label="Schedule Money"
              type="number"
              onChange={this.scheduleMoneyChange}
              value={this.state.scheduleMoney}
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
              placeholder="Schedule Money"
              style={{maxWidth: 292, flex: 1}}
            />

            <TextField
              label="Security Money"
              type="number"
              onChange={this.securityMoneyChange}
              className={classes.spacing}
              value={this.state.securityMoney}
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
              placeholder="Security Money"
              style={{maxWidth: 292, marginLeft: 16, flex: 1}}
            />
          </div>
          <TextField
            label="Link"
            onChange={this.linkChange}
            className={classes.spacing}
            value={this.state.link}
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
            placeholder="Link"
            style={{maxWidth: 600}}
          />

          <TextField
            id="multiline-static"
            label="Note"
            onChange={this.noteChange}
            value={this.state.note}
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
            margin="normal"
            placeholder="Note"
            style={{maxWidth: 600}}
          />


          <div style={{display: 'flex'}}>
            <Button variant="contained" style= {{maxWidth: 220, marginRight: 16, marginBottom: 240}} onClick={this.addTender} color="primary" className={classes.spacing}>
                Add Tender
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
                {"Tender Added Successfully"}
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

export default withStyles(styles)(AddTender);
