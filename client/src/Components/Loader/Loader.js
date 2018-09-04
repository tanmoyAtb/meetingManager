import React, { Component } from 'react';
import logo from './loading.svg';

class App extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <header >
          <img src={logo} style={{marginTop: 80}} alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
