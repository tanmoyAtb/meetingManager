import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import Calendar from 'react-calendar';
 
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './dateCss.css'
 
const styles = theme =>  ({
  radioStyle: {
    marginLeft: 36, marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 8, marginTop: 10
    }
  }
});

class DateRadio extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dateMoment: moment(),
      checked: false,
      dateDate: new Date(),
      dateString: moment().format('DD/MM/YYYY'),
      open: false
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeChecked = this.handleChangeChecked.bind(this);
  }
 
  handleChangeDate(date) {
    this.setState({
      dateMoment: date,
      dateDate: date.toDate(),
      dateString: date.format('DD/MM/YYYY')
    });
  }

  handleChangeChecked(e) {
    this.setState((prevState, props) => {
      return {checked: !prevState.checked};
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = date => {
    console.log(date);
    const aMoment = moment(date);

    this.setState({ dateDate: date, dateString: aMoment.format('DD/MM/YYYY'), dateMoment: aMoment, open: false})
  }

  smallDateChange = e => {
    let date = e.target.value;
    let aMoment = moment(date, 'DD/MM/YYYY');
    if(aMoment.isValid()){
      this.setState({ dateMoment: aMoment, dateString: date, dateDate: aMoment.toDate()});
    }
    else {
      this.setState({ dateString: date});
    }
    
  }
 
  render() {
    const  { classes } = this.props;
    console.log(this.state.dateMoment, this.state.dateMoment.isValid(), this.state.dateDate);
    return (
      <div style={{display: 'flex'}}>
      	<div className="myContainter">
          <div className="dateBoxLarge">
            <label htmlFor="date">Date</label>
            <DatePicker dateFormat="DD/MM/YYYY" className="myDateLarge" selected={this.state.dateMoment}
                      onChange={this.handleChangeDate} />
          </div>

          <div className="dateBoxSmall">
            <label htmlFor="date">Date</label>
            <div style={{display: 'flex'}}>
              <input type="text" onChange={this.smallDateChange} value={this.state.dateString} className="myDateSmall" />
              <Button 
                variant="outlined"
                className="calButton"
                style= {{padding: 0, minWidth: 0, width: 40, marginLeft: 6}}
                onClick={this.handleClickOpen}
              >
                <i className="fa fa-calendar" />
              </Button>
            </div>
          </div>

        </div>
        <FormGroup className={classes.radioStyle} >
          <FormControlLabel
            control={
              <Switch checked={this.state.checked} onChange={this.handleChangeChecked} aria-label="myMeetingSwitch" />
            }
            label="My Meetings"
          />
        </FormGroup>


        <div>
          <Dialog
            open={this.state.open}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <Calendar
              onChange={this.onChange}
              value={this.state.dateDate}
            />
          </Dialog>
        </div>
      </div>
	)
  }
}

export default  withStyles(styles)(DateRadio);