import React, { Component } from 'react';
import logo from './loading.svg';
import tenderlogo from './bigtender.svg';

class App extends Component {
  constructor(props) {
     super(props);
     this.state = {

     };
  }


  render() {
  	const {tender} = this.props;

  	let myLogo = <img src={logo} style={{marginTop: 80}} alt="logo" />;

  	if(tender){
  		myLogo = <img src={tenderlogo} style={{marginTop: 80}} alt="logo" />;
  	}

    return (
      <div style={{textAlign: 'center'}}>
        <header >
          {myLogo}
        </header>
      </div>
    );
  }
}

export default App;
