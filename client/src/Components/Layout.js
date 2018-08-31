import React, { Component } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';

class Layout extends Component {
  constructor(props) {
        super(props);
        this.state = {
          logged: true,
          name: ''
        };

  }

  componentDidMount() {
      if(localStorage.getItem('jwtToken')){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      
        axios.get('http://localhost:5000/auth/profile')
          .then(res => {
            this.setState({ name: res.data.user.name, logged: true });
            console.log(res.data.user);
          })
          .catch((error) => {
             console.error(error);
             localStorage.removeItem('jwtToken');
             localStorage.removeItem('name');
             this.setState({logged: false, name: ''});
          });
          
      }
      else {

      }
  }


  render() {
    let template = <LoginPage/>
    if(this.state.logged){
      template = <LandingPage/>
    }
    return (
      <div>
        {template}
      </div>
    );
  }
}

export default (Layout);
