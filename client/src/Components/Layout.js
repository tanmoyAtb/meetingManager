import React, { Component } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import AddLayout from './AddMeeting/AddLayout';
import Meeting from './Meeting/Meeting';

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
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('name');
      localStorage.removeItem('username');
      this.setState({logged: 'login', name: '', username: ''});
      this.props.history.push('/');
  }


  componentDidMount() {
      if(localStorage.getItem('jwtToken')){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      
        axios.get('http://localhost:5000/auth/profile')
          .then(res => {
            this.setState({ name: res.data.user.name, username: res.data.user.username, logged: 'loggedin' });
          })
          .catch((error) => {
             console.error(error);
             localStorage.removeItem('jwtToken');
             localStorage.removeItem('name');
             this.setState({logged: 'login', name: '', username: ''});
          });
          
      }
      else {
        this.setState({logged: 'login', name: '', username: ''});
      }
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
