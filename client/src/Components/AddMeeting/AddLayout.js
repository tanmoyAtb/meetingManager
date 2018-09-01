import React, { Component } from 'react';
import axios from 'axios';
import AddHeader from './AddHeader';
import AddMeeting from './AddMeeting';

class Layout extends Component {
  constructor(props) {
        super(props);
        this.state = {
        };

  }

  handleLogout = (e) => {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('name');
      localStorage.removeItem('username');
      this.props.history.push('/');
  }


  render() {
    return (
      <div>
        <AddHeader {...this.props} logout={this.handleLogout}/>
        <AddMeeting/>
      </div>
    );
  }
}

export default (Layout);
