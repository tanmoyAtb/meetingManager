import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Axios from 'Utils/Axios';
import Helpers from 'Utils/Helpers';
import Loader from 'Components/Loader/Loader';
import Card from '../Card/Card';

import styles from './tendersStyle';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting: null,
      open: false,
      openConfirm: false,
      summary: '',
      mode: 'wait',
      name: '',
      username: ''
    };
  }

  componentDidMount() {
      let that=this;
      Axios.getProfile(function(err, data){
        if (err) {
          console.log(err);
          if(err === 'unauthorized') that.props.history.push("/");
        }
        else {
          that.setState({mode: 'details', name: data.user.name, username: data.user.username});
        }
      })
  }


  render() {
    const { classes } = this.props;
      return (
        <div >
          <Header logout={this.handleLogout} history={this.props.history} name={this.state.name}/>
          
        </div>
      );
  }
}

export default withStyles(styles)(Meeting);
