import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header/Header';
import Body from './Body/Body';

class LandingPage extends Component {

  render() {
    return (
      <div>
        <Header {...this.props}/>
        <Body/>
      </div>
    );
  }
}

export default (LandingPage);
