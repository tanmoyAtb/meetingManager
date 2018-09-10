import React, { Component } from 'react';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import Loader from 'Components/Loader/Loader';

import Axios from 'Utils/Axios';

class Layout extends Component {
  constructor(props) {
        super(props);
        this.state = {
          logged: 'wait',

          name: '',
          username: '',

          usersList: [],

          allUpcomingMeetings: [],
          allUnresolvedMeetings: [],
          allHistoryMeetings: [],

          dateFilteredUpcomingMeetings: [],
          dateFilteredUnresolvedMeetings: [],
          dateFilteredHistoryMeetings: [],
          
          filteredUpcomingMeetings: [],
          filteredUnresolvedMeetings: [],
          filteredHistoryMeetings: [],
          

          modeUpcoming: 'wait',
          modeUnresolved: 'wait',
          modeHistory: 'wait',

          userUpcoming: {id: false, value: "All", label: "All"},
          userUnresolved: {id: false, value: "All", label: "All"},
          userHistory: {id: false, value: "All", label: "All"}
        };

  }

  loggedIn = (data) => {
    this.setState({logged: 'loggedin', name: data.name, username: data.username});
  }

  onUpcomingDateChange = (date) => {
    let meetingsFiltered = [];
    let dateD = date.setHours(0, 0, 0, 0);
    let dateI = null;
    this.state.allUpcomingMeetings.forEach(function(meeting){
      dateI = new Date(meeting.datetime).setHours(0, 0, 0, 0);
      if(dateD === dateI){
        meetingsFiltered.push(meeting);
      }
    })
    this.setState({filteredUpcomingMeetings: meetingsFiltered, dateFilteredUpcomingMeetings: meetingsFiltered});
  }

  onUserUpcomingChange = (selected) => {
    this.setState({userUpcoming: selected});
    if(selected.id){
      let meetingsFiltered = [];
      this.state.dateFilteredUpcomingMeetings.forEach(function(meeting){
        for(let i=0;i<meeting.attendees.length;i++){
          if(meeting.attendees[i].id === selected.id){
            meetingsFiltered.push(meeting);
            break;
          }
        }
      })
      this.setState({filteredUpcomingMeetings: meetingsFiltered});
    }
    else{
      let meetingsFiltered = this.state.dateFilteredUpcomingMeetings;
      this.setState({filteredUpcomingMeetings: meetingsFiltered});
    }
    
  }

  onUnresolvedDateChange = (date) => {
    let newDate = new Date();
    newDate.setHours(0, 0, 0, 0);
    
    let dateD = date.setHours(0, 0, 0, 0);
    
    let dateI = null;
    let meetingsFiltered = [];
    this.state.allUnresolvedMeetings.forEach(function(meeting){
      dateI = new Date(meeting.datetime).setHours(0, 0, 0, 0);
      if(dateD === dateI){
        meetingsFiltered.push(meeting);
      }
    })
    this.setState({filteredUnresolvedMeetings: meetingsFiltered, dateFilteredUnresolvedMeetings: meetingsFiltered});
  }

  onUserUnresolvedChange = (selected) => {
    this.setState({userUnresolved: selected});
    if(selected.id){
      let meetingsFiltered = [];
      this.state.dateFilteredUnresolvedMeetings.forEach(function(meeting){
        for(let i=0;i<meeting.attendees.length;i++){
          if(meeting.attendees[i].id === selected.id){
            meetingsFiltered.push(meeting);
            break;
          }
        }
      })
      this.setState({filteredUnresolvedMeetings: meetingsFiltered});
    }
    else{
      let meetingsFiltered = this.state.dateFilteredUnresolvedMeetings;
      this.setState({filteredUnresolvedMeetings: meetingsFiltered});
    }
    
  }

  onDateHistoryChange = (date) => {
    let meetingsFiltered = [];
    let dateD = date.setHours(0, 0, 0, 0);
    let dateI = null;
    this.state.allHistoryMeetings.forEach(function(meeting){
      dateI = new Date(meeting.datetime).setHours(0, 0, 0, 0);
      if(dateD === dateI){
        meetingsFiltered.push(meeting);
      }
    })
    this.setState({filteredHistoryMeetings: meetingsFiltered, dateFilteredHistoryMeetings: meetingsFiltered});
  }

  onUserHistoryChange = (selected) => {
    this.setState({userHistory: selected});
    if(selected.id){
      let meetingsFiltered = [];
      this.state.dateFilteredHistoryMeetings.forEach(function(meeting){
        for(let i=0;i<meeting.attendees.length;i++){
          if(meeting.attendees[i].id === selected.id){
            meetingsFiltered.push(meeting);
            break;
          }
        }
      })
      this.setState({filteredHistoryMeetings: meetingsFiltered});
    }
    else{
      let meetingsFiltered = this.state.dateFilteredHistoryMeetings;
      this.setState({filteredHistoryMeetings: meetingsFiltered});
    }
    
  }

  onMeetingAdded = (meeting) => {
    this.setState({modeUpcoming: 'wait', modeUnresolved: 'wait'});
    this.getUpcomingMeetings();
    this.getUnresolvedMeetings();
  }

  handleLogout = (e) => {
    let that = this;
    Axios.logout(function(){
      that.setState({logged: 'login', name: '', username: ''})
      that.props.history.push('/');
    })
  }


  componentDidMount() {
      let that=this;
      Axios.getProfile(function(err, data){
        if (err) {
          console.log(err);
          that.setState({logged: 'login', name: '', username: ''});
        }
        else {
          that.setState({logged: 'loggedin', name: data.name, username: data.username});
          that.getUsersList();
          that.getUpcomingMeetings();
          that.getUnresolvedMeetings();
          that.getHistoryMeetings();
        }
      })
  }

  getUsersList = () => {
    let that = this;
    Axios.getUsersList(function(err, data){
      if(err) {
        console.log(err);
        if(err.includes("unauthorized")) that.history.push("/");
      }
      else {
        that.setState({usersList : data.users});
      }
    })
  }

  getUpcomingMeetings = () => {
    let that = this;
    Axios.getUpcomingMeetings(function(err, data){
      if(err) {
        if(err.includes("unauthorized")) that.history.push("/");
      }
      else {
        that.setState({modeUpcoming: 'details', allUpcomingMeetings : data.meetings, filteredUpcomingMeetings : data.meetings, dateFilteredUpcomingMeetings : data.meetings});
      }
    })
  }

  getUnresolvedMeetings = () => {
    let that = this;
    Axios.getUnresolvedMeetings(function(err, data){
      if(err) {
        if(err.includes("unauthorized")) that.history.push("/");
      }
      else {
        that.setState({modeUnresolved: 'details', allUnresolvedMeetings : data.meetings, filteredUnresolvedMeetings : data.meetings, dateFilteredUnresolvedMeetings : data.meetings});
      }
    })
  }

  getHistoryMeetings = () => {
    let that = this;
    Axios.getHistoryMeetings(function(err, data){
      if(err) {
        if(err.includes("unauthorized")) that.history.push("/");
      }
      else {
        that.setState({modeHistory: 'details', allHistoryMeetings : data.meetings, filteredHistoryMeetings : data.meetings, dateFilteredHistoryMeetings : data.meetings});
      }
    })
  }


  render() {
    let template = <Loader />;

    if(this.state.logged === 'loggedin'){
      template = <LandingPage {...this.props}
                    onUpcomingDateChange= {this.onUpcomingDateChange} onUserUpcomingChange={this.onUserUpcomingChange}
                    onUnresolvedDateChange= {this.onUnresolvedDateChange} onUserUnresolvedChange ={this.onUserUnresolvedChange} 
                    onDateHistoryChange= {this.onDateHistoryChange} onUserHistoryChange ={this.onUserHistoryChange} 
                    users={this.state.usersList} name={this.state.name} logout={this.handleLogout}
                    upcomingMeetings={this.state.filteredUpcomingMeetings} unresolvedMeetings={this.state.filteredUnresolvedMeetings}
                    historyMeetings={this.state.filteredHistoryMeetings} onAddMeeting={this.onMeetingAdded}
                    modeUpcoming={this.state.modeUpcoming} modeUnresolved={this.state.modeUnresolved} modeHistory={this.state.modeHistory}
                    userUpcoming={this.state.userUpcoming} userUnresolved={this.state.userUnresolved} userHistory={this.state.userHistory}/>
    }
    else if(this.state.logged === 'login') {
      template = <LoginPage loggedIn={this.loggedIn}/>
    }
    return (
      <div>
        {template}

      </div>
    );
  }
}

export default (Layout);
