import React, { Component } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import AddLayout from './AddMeeting/AddLayout';
import Meeting from './Meeting/Meeting';

import Axios from 'Utils/Axios';

class Layout extends Component {
  constructor(props) {
        super(props);
        this.state = {
          logged: 'wait',
          name: '',
          username: ''
        };

  }

  loggedIn = (data) => {
    this.setState({logged: 'loggedin', name: data.name, username: data.username});
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
        if (err) that.setState({logged: 'login', name: '', username: ''});
        else {
          that.setState({ name: data.user.name, username: data.user.username, logged: 'loggedin' });
        }
      })
  }


  render() {
    let template;

    if(this.state.logged === 'loggedin'){
      template = <LandingPage {...this.props} logout={this.handleLogout}/>
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
