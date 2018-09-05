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
          users: [],
          allMeetings: [],
          filteredMeetings: [],
          user: {id: false, value: "All", label: "All"}
        };

  }

  loggedIn = (data) => {
    this.setState({logged: 'loggedin', name: data.name, username: data.username, users: data.users, allMeetings: data.meetings, filteredMeetings: data.meetings});
  }

  onDateChange = (date) => {
    let that = this;
    Axios.getHomeMeetingsAndUsers(date, function(err, data){
        if (err) {
          that.setState({logged: 'login', name: '', username: ''});
        }
        else {
          that.setState({logged: 'loggedin', name: data.name, username: data.username, users: data.users,
                         allMeetings: data.meetings, filteredMeetings: data.meetings, user: {id: false, value: "All", label: "All"} });
        }
      })
  }

  userChange = (selected) => {
    this.setState({user: selected});
    if(selected.id){
      let meetingsFiltered = [];
      this.state.allMeetings.forEach(function(meeting){
        for(let i=0;i<meeting.attendees.length;i++){
          if(meeting.attendees[i].id === selected.id){
            meetingsFiltered.push(meeting);
            break;
          }
        }
      })
      this.setState({filteredMeetings: meetingsFiltered});
    }
    else{
      let meetingsFiltered = this.state.allMeetings;
      this.setState({filteredMeetings: meetingsFiltered});
    }
    
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
      Axios.getHomeMeetingsAndUsers(new Date(), function(err, data){
        if (err) {
          console.log(err);
          that.setState({logged: 'login', name: '', username: ''});
        }
        else {
          that.setState({logged: 'loggedin', name: data.name, username: data.username, users: data.users, allMeetings: data.meetings, filteredMeetings: data.meetings});
        }
      })
  }


  render() {
    let template = <Loader />;

    if(this.state.logged === 'loggedin'){
      template = <LandingPage {...this.props} onDateChange={this.onDateChange} users={this.state.users} name={this.state.name}
                    meetings={this.state.filteredMeetings} userChange={this.userChange} logout={this.handleLogout} user={this.state.user}/>
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
