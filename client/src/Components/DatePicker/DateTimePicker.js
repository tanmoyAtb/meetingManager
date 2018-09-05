import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import Calendar from 'react-calendar';
 import Select from 'react-select';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './dateCss.css'
 
const styles = theme =>  ({
  radioStyle: {
    marginLeft: 48, marginTop: 5, flex: 1,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 8, marginTop: 5
    }
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: 'column',
    padding: "8px 20%",
    marginTop: 12,
    [theme.breakpoints.down("sm")]: {
      padding: "8px 12px",
    }
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

    const { date } = props;

    if (date) {
      this.state = {
        dateMoment: moment(date),
        dateDate: date,
        dateString: moment(date).format('DD/MM/YYYY'),
        open: false
      };
    }
    else {
      this.state = {
        dateMoment: moment(),
        dateDate: new Date(),
        dateString: moment().format('DD/MM/YYYY'),
        open: false
      };
    }
    
  }
 
  handleChangeDate = (date) => {
    this.setState({
      dateMoment: date,
      dateDate: date.toDate(),
      dateString: date.format('DD/MM/YYYY')
    });
    this.props.dateChange(date.toDate());
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = date => {
    const aMoment = moment(date);
    this.setState({ dateDate: date, dateString: aMoment.format('DD/MM/YYYY'), dateMoment: aMoment, open: false});
    this.props.dateChange(date);
  }

  smallDateChange = e => {
    let date = e.target.value;
    let aMoment = moment(date, 'DD/MM/YYYY');
    if(aMoment.isValid()){
      this.props.dateChange(aMoment.toDate());
      this.setState({ dateMoment: aMoment, dateString: date, dateDate: aMoment.toDate()});
    }
    else {
      this.setState({ dateString: date});
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
      <div style= {{display: 'flex', marginBottom: 16}}>
          <div className="dateBoxLarge">
            <label className={bigClass} htmlFor="date">{labelIn}</label>
            <DatePicker dateFormat="DD/MM/YYYY" className="myDateLarge" selected={this.state.dateMoment}
                      onChange={this.handleChangeDate} />
          </div>

          <div className="dateBoxSmall">
            <label className={bigClass} htmlFor="date">{labelIn}</label>
            <div style={{display: 'flex'}}>
              <input type="text" onChange={this.smallDateChange} value={this.state.dateString} className="myDateSmall" style={{maxWidth: 120, flex: 1}}/>
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
                }}
                InputProps={{
                  style: {marginTop: 13}
                }}
                style={{maxWidth: 350, width: '100%'}}
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