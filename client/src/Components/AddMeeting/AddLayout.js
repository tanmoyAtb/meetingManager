import React, { Component } from 'react';
import AddHeader from './AddHeader';
import AddMeeting from './AddMeeting';
import Loader from 'Components/Loader/Loader';

import Axios from 'Utils/Axios';

class Layout extends Component {
  constructor(props) {
        super(props);
        this.state = {
          logged: 'wait',
          name: '',
          username: '',
          attendees: []
        };

  }

  handleLogout = (e) => {
      let that = this;
      Axios.logout(function(){
        that.props.history.push('/');
      })
  }

componentDidMount() {
    let that=this;
    Axios.getMeeting(function(err, data){
      if (err) that.props.history.push('/');
      else {
        that.setState({ name: data.user.name, username: data.user.username, attendees: data.meetingUsers, logged: 'loggedin' });
      }
    })
}

  render() {
    let template = <Loader/>;

    if (this.state.logged === 'loggedin'){
      template = <div>
                    <AddHeader {...this.props} logout={this.handleLogout}/>
                    <AddMeeting attendees={this.state.attendees}/>
                  </div>
    }
    return (
      <div>
        {template}
      </div>
    );
  }
}

export default (Layout);
