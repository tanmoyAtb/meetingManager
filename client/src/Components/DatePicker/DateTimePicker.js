import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import Calendar from 'react-calendar';
import Select from 'react-select';

import Helpers from 'Utils/Helpers';

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

    const { date, time } = props;

    if (date) {
      this.state = {
        dateMoment: moment(date),
        dateDate: date,
        dateString: moment(date).format('DD/MM/YYYY'),
        open: false,
        time: ''
      };
    }
    if (time && date) {
      this.state = {
        dateMoment: moment(date),
        dateDate: date,
        dateString: moment(date).format('DD/MM/YYYY'),
        open: false,
        time: time
      };
    }
    else {
      this.state = {
        dateMoment: moment(),
        dateDate: new Date(),
        dateString: moment().format('DD/MM/YYYY'),
        time: '',
        open: false
      };
    }
    
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }


  handleChangeRaw = (e) => {
    let date = e.target.value;
    let aMoment = moment(date, 'DD/MM/YYYY');
    if(aMoment.isValid()){

      this.setState({ dateMoment: aMoment, dateString: date, dateDate: aMoment.toDate()});

      if (this.state.time instanceof Date){
        let dateD = aMoment.toDate();
        let timeD = this.state.time;

        let datetime = new Date(dateD.getFullYear(), dateD.getMonth(), dateD.getDate(), timeD.getHours(), timeD.getMinutes(), 0, 0);

        this.props.dateTimeChange(datetime);
      }
      else {
        this.props.dateTimeChange(null); 
      }

    }
    else {
      this.setState({ dateString: date, dateMoment : null, dateDate: null});
      this.props.dateTimeChange(null); 
    }
  }

  handleChangeDate = (date) => {
    this.setState({
      dateMoment: date,
      dateDate: date.toDate(),
      dateString: date.format('DD/MM/YYYY')
    });
    if (this.state.time instanceof Date){
      let dateD = date.toDate();
      let timeD = this.state.time;

      let datetime = new Date(dateD.getFullYear(), dateD.getMonth(), dateD.getDate(), timeD.getHours(), timeD.getMinutes(), 0, 0);

      this.props.dateTimeChange(datetime);
    }
    else {
      this.props.dateTimeChange(null);
    }
  }

  onChange = date => {
    const aMoment = moment(date);
    this.setState({ dateDate: date, dateString: aMoment.format('DD/MM/YYYY'), dateMoment: aMoment, open: false});

    if (this.state.time instanceof Date){
      let dateD = date;
      let timeD = this.state.time;

      let datetime = new Date(dateD.getFullYear(), dateD.getMonth(), dateD.getDate(), timeD.getHours(), timeD.getMinutes(), 0, 0);

      this.props.dateTimeChange(datetime);
    }
    else {
      this.props.dateTimeChange(null); 
    }
  }

  smallDateChange = e => {
    let date = e.target.value;
    let aMoment = moment(date, 'DD/MM/YYYY');
    if(aMoment.isValid()){

      this.setState({ dateMoment: aMoment, dateString: date, dateDate: aMoment.toDate()});

      if (this.state.time instanceof Date){
        let dateD = aMoment.toDate();
        let timeD = this.state.time;

        let datetime = new Date(dateD.getFullYear(), dateD.getMonth(), dateD.getDate(), timeD.getHours(), timeD.getMinutes(), 0, 0);

        this.props.dateTimeChange(datetime);
      }
      else {
        this.props.dateTimeChange(null); 
      }

    }
    else {
      this.setState({ dateString: date, dateMoment : null, dateDate: null});
      this.props.dateTimeChange(null); 
    }
  }

  timeChange = e => {
    let time = moment(e.target.value, 'HH:mm');
    if(time.isValid()){

      this.setState({time: time.toDate()});

      if (this.state.dateDate instanceof Date){
          let dateD = this.state.dateDate;
          let timeD = time.toDate();

          let datetime = new Date(dateD.getFullYear(), dateD.getMonth(), dateD.getDate(), timeD.getHours(), timeD.getMinutes(), 0, 0);

          this.props.dateTimeChange(datetime);
      }
      else{
        this.props.dateTimeChange(null); 
      }
    }
    else {
      this.props.dateTimeChange(null); 
    }
    
  }
 
  render() {
    const  { classes, big, label } = this.props;
    let bigClass;
    let labelIn = "Date"
    if( label ) labelIn = label; 
    if(big){
      bigClass="bigClass";
    }

    const users = [];

    return (
      <div className={classes.container}>
          <div className="dateBoxLarge">
            <label className={bigClass} htmlFor="date">{labelIn}</label>
            <DatePicker dateFormat="DD/MM/YYYY" className="myDateLarge" selected={this.state.dateMoment}
                      onChangeRaw={this.handleChangeRaw} onChange={this.handleChangeDate} />
          </div>

          <div className="dateBoxSmall">
            <label className={bigClass} htmlFor="date">{labelIn}</label>
            <div style={{display: 'flex'}}>
              <input type="text" onChange={this.smallDateChange} value={this.state.dateString} className="myDateSmall" style={{maxWidth: 180, flex: 1}}/>
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
                defaultValue={this.props.time && Helpers.format_time_string(new Date(this.props.time))}
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
                }}
                InputProps={{
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
              value={this.state.dateDate}
            />
          </Dialog>
        </div>
      </div>
  )
  }
}

export default  withStyles(styles)(DatePickerComp);