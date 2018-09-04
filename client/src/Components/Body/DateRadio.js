import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import Select from 'react-select';

import Calendar from 'react-calendar';
 
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './dateCss.css'
 
const styles = theme =>  ({
  radioStyle: {
    marginLeft: 36, flex: 1, maxWidth: 300,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 8
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
      open: false,

      rtl: true,
      
    };
  }
 
  handleChangeDate = (date) => {
    this.setState({
      dateMoment: date,
      dateDate: date.toDate(),
      dateString: date.format('DD/MM/YYYY')
    });

    this.props.onDateChange(date.toDate());
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

    this.props.onDateChange(date);
  }

  smallDateChange = e => {
    let date = e.target.value;
    let aMoment = moment(date, 'DD/MM/YYYY');
    if(aMoment.isValid()){
      this.setState({ dateMoment: aMoment, dateString: date, dateDate: aMoment.toDate()});

      this.props.onDateChange(aMoment.toDate());
    }
    else {
      this.setState({ dateString: date});
    }
  }

  userChange = selected => {
    this.props.userChange(selected);
  }
 
  render() {
    const  { classes} = this.props;

    const users = [{id: false, value: "All", label: "All"}]; 
    this.props.users.forEach(function(user){
      users.push({id: user._id, value: user.username, label: user.name});
    })

    return (
      <div>
      	<div style= {{display: 'flex', marginBottom: 16}}>
          <div className="dateBoxLarge">
            <label htmlFor="date">Date</label>
            <DatePicker dateFormat="DD/MM/YYYY" className="myDateLarge" selected={this.state.dateMoment}
                      onChange={this.handleChangeDate} />
          </div>

          <div className="dateBoxSmall">
            <label htmlFor="date">Date</label>
            <div style={{display: 'flex'}}>
              <input type="text" onChange={this.smallDateChange} value={this.state.dateString} className="myDateSmall" style={{maxWidth: 140, flex: 1}}/>
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
              <label htmlFor="User">User</label>
              <Select
                  id="User"
                  onChange={this.userChange}
                  options={users}
                  placeholder="Select User"
                  rtl={this.state.rtl}
                  simpleValue
                  value={this.props.user}
                  style={{flex: 1}}
              />
          </div>

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

export default  withStyles(styles)(DateRadio);