import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Email from "@material-ui/icons/Email";
import Typography from '@material-ui/core/Typography';

import config from './config';
import axios from 'axios';

import styles from "./loginPageStyle";


class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    msgLogin: '',
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  login = (e) => {
    console.log(this.state);
    if(this.state.username && this.state.password){

      axios.post(config.url + '/auth/login', {username : this.state.username, password: this.state.password})
        .then(res => {
            if(res.data && res.data.success){
                // console.log(res);
                axios.defaults.headers.common['Authorization'] = res.data.token;
                localStorage.setItem('jwtToken', res.data.token);
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('username', res.data.username);
                this.props.loggedIn(res.data);
            }
          })
        .catch((error) => {
            if(error.response && error.response.data){
              this.setState({msgLogin : error.response.data.msg});
            }
            else {
              this.setState({msgLogin : 'Server not responding'});
            }
        });
    }
    else {
      this.setState({msgLogin : "Fill Up all details"});
    }
  }



  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.container}>
        <Typography variant="display2" style={{color: '#3d81a9', fontFamily: 'Dekko', fontWeight: 'bold'}} gutterBottom>
          MeetGo
        </Typography>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
          <Input
            id="input-with-icon-adornment"
            onChange={this.handleChange('username')}
            endAdornment={
              <InputAdornment position="end">
                <Email />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={classNames(classes.margin)}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Typography variant="title" style={{color: '#FF6E40', fontFamily: 'Helvetica'}} gutterBottom>
          {this.state.msgLogin}
        </Typography>
        <Button variant="contained" className={classNames(classes.content)} onClick={this.login} color="primary">
          LOGIN
        </Button>
      </div>
    );
  }
}


export default withStyles(styles)(LoginPage);