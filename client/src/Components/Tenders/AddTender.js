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

class AddTender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dateTimePublished: new Date(),
      dateTimeLast: new Date(),
      dateTimeDropping: new Date(),
      dateTimeOpening: new Date(),
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
    this.handleClose();
  }

  dateTimePublishedChange = (date) => {
    this.setState({dateTimePublished: date});
  }

  dateTimeLastChange = (date) => {
    this.setState({dateTimeLast: date});
  }

  dateTimeDroppingChange = (date) => {
    this.setState({dateTimeDropping: date});
  }

  dateTimeOpeningChange = (date) => {
    this.setState({dateTimeOpening: date});
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
    this.setState({scheduleMoney: parseInt(e.target.value)});
  }

  securityMoneyChange = (e) => {
    this.setState({securityMoney: parseInt(e.target.value)});
  }

  linkChange = (e) => {
    this.setState({link: e.target.value});
  }

  addTender = (e) => {
    const states = this.state;
    let that = this;
    if(states.dateTimePublished && states.dateTimeLast && states.dateTimeDropping && states.dateTimeOpening 
        && states.client && states.work && states.note && states.scheduleMoney && states.securityMoney && states.link){

      Axios.postTender(states, function(err, tender){
        if(err){
          console.log(err);
            if(err === 'unauthorized') that.props.history.push("/");
        }
        else {
          that.handleClickOpen();
          that.props.gotNewTender(tender);
        }
      })
    }
  }

  componentDidMount() {

  }


  render() {
    const { classes } = this.props;

    return (
      <div style={{display: 'flex', flexFlow: 'column', marginTop: 24}}>
          <Typography variant="display1" style={{color: '#263238', marginBottom: 16}} gutterBottom>
              Add Tender 
          </Typography>
          <div  className={classes.spacing}>
            <DateTimePicker big label="Published Date" dateTimeChange={this.dateTimePublishedChange}/>
          </div>

          <div  className={classes.spacing}>
            <DateTimePicker big label="Last Date" dateTimeChange={this.dateTimeLastChange}/>
          </div>

          <div  className={classes.spacing}>
            <DateTimePicker big label="Dropping Date" dateTimeChange={this.dateTimeDroppingChange}/>
          </div>

          <div  className={classes.spacing}>
            <DateTimePicker big label="Opening Date" dateTimeChange={this.dateTimeOpeningChange}/>
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
              onChange={this.scheduleMoneyChange}
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
              required
              type="number"
              onChange={this.securityMoneyChange}
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
              placeholder="Security Money"
              style={{maxWidth: 292, marginLeft: 16, flex: 1}}
            />
          </div>
          <TextField
            label="Link"
            required
            onChange={this.linkChange}
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
            placeholder="Link"
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
