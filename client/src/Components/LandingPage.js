import React, { Component } from 'react';
import Header from './Header/Header';
import Body from './Body/Body';

class LandingPage extends Component {

  render() {
    return (
      <div>
        <Header {...this.props}/>
        <Body {...this.props}/>
      </div>
    );
  }
}

export default (LandingPage);
