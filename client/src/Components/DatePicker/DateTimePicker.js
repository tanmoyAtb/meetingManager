import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import Calendar from 'react-calendar';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './dateCss.css'
 
const styles = theme =>  ({
  radioStyle: {
    marginLeft: 48, marginTop: 5, flex: 1,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0, marginTop: 30
    }
  },
  container: {
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
      flexFlow: 'column'
    }
  },
  timeBox: {
    maxWidth: 350, 
    width: '100%',
    marginTop: 0
  },
  spacing: {
    marginTop: 0
  },
  label: {
    fontSize: 30,
    color: "#263238",
    position: 'relative'
  },
  input: {
    marginTop: 0,
  },
  focus: {
    color: '#263238'
  }
});

class DatePickerComp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChangeRaw = e => {
    this.props.dateChange(e.target.value);
  }
 
  handleChangeDate = date => {
    this.props.dateChange(date.format('DD/MM/YYYY'));
  }

  onChange = date => {
    let aMoment = moment(date);
    this.props.dateChange(aMoment.format('DD/MM/YYYY'));
  }

  smallDateChange = e => {
    this.props.dateChange(e.target.value);
  }

  timeChange = e => {
    this.props.timeChange(e.target.value); 
  }
 
  render() {
    const  { classes, big, label, dateString, timeString } = this.props;

    let bigClass;
    if(big){
      bigClass="bigClass";
    }
    
    let myLabel = "Date";
    if(label){
      myLabel = label;
    }

    let dateMoment = moment();
    let dateDate= new Date();
    
    let dateMomentTemp= moment(dateString, 'DD/MM/YYYY');
    
    if (dateMomentTemp.isValid()){
        dateMoment = dateMomentTemp;
        dateDate= dateMomentTemp.toDate();
    }

    return (
      <div className={classes.container}>
          <div className="dateBoxLarge">
            <label className={bigClass} htmlFor="date">{myLabel}</label>
            <DatePicker dateFormat="DD/MM/YYYY" className="myDateLarge" selected={dateMoment}
                      onChangeRaw={this.handleChangeRaw} onChange={this.handleChangeDate} />
          </div>

          <div className="dateBoxSmall">
            <label className={bigClass} htmlFor="date">{myLabel}</label>
            <div style={{display: 'flex'}}>
              <input type="text" onChange={this.smallDateChange} value={dateString} className="myDateSmall" style={{maxWidth: 180, flex: 1}}/>
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
          <div className={classes.radioStyle}>
              <TextField
                id="time"
                label="Time"
                type="time"
                onChange={this.timeChange}
                value={timeString}
                className={classes.timeBox}
                InputLabelProps={{
                  FormLabelClasses: {
                    root: classes.label,
                  },
                  shrink: true,
                  focused: false
                }}
                inputProps={{
                  step: 300, 
                  style: {marginTop: 10}
                }}
                
              />
          </div>

        

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
              value={dateDate}
            />
          </Dialog>
        </div>
      </div>
  )
  }
}

export default  withStyles(styles)(DatePickerComp);