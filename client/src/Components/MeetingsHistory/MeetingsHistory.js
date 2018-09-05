import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';
import Typography from '@material-ui/core/Typography';
import Axios from 'Utils/Axios';
import Helpers from 'Utils/Helpers';
import Loader from 'Components/Loader/Loader';
import Card from '../Card/Card';
import styles from './meetingStyle';


class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingsByDate: [],
      open: false,
      mode: 'wait',
      name: '',
      username: ''
    };

  }

  handleLogout = (e) => {
    let that = this;
    Axios.logout(function(){
      that.props.history.push('/');
    })
  }

  componentDidMount() {
      let that=this;
      Axios.getProfile(function(err, data){
        if (err) {
          console.log(err);
          if(err === 'unauthorized') that.props.history.push("/");
        }
        else {
          that.setState({mode: 'details', name: data.user.name, username: data.user.username});
          Axios.getAllMeetings(function(err, data){
            that.setState({meetingsByDate: data.meetings});
          })
        }
      })
  }

  returnHistories = () => {
    let counter = 0; 
    return this.state.meetingsByDate.map(function(meetingsOnDate){
      counter = 0;
      return meetingsOnDate.entries.reverse().map(function(meeting){
        if(counter === 0 ){
          counter++;
          return (
            <div key={meeting._id} style={{marginTop: 48}}>
              <Typography variant="display1" style={{color: '#263238', fontSize: 30}} >
                  {Helpers.format_date(new Date(meeting.date))} 
              </Typography>
              <Card  showDate meeting={meeting}/>
            </div>
          )
        }
        else{
          return (
            <Card key={meeting._id} showDate meeting={meeting}/>
          )
        }
        
      })
    })
  }


  render() {
    const { classes } = this.props;
    const { mode} = this.state;

    if(mode === 'wait'){
      return (
          <Loader/>
        )
    }
    else {
      return (
          <div>
            <Header logout={this.handleLogout} history={this.props.history} name={this.state.name}/>
            <div className={classes.container}>
              {this.returnHistories()}
            </div>
          </div>
        )
    }
    
  }
}

export default withStyles(styles)(Meeting);
