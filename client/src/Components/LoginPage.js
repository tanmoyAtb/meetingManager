import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import DialogContent from '@material-ui/core/DialogContent';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Email from "@material-ui/icons/Email";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import styles from "./loginPageStyle";


class LoginPage extends React.Component {
  state = {
    open: false,
    modalVar: 'LOGIN'
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

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
            <Button variant="contained" className={classNames(classes.content)} onClick={this.setLogin} color="primary">
              LOGIN
            </Button>
      </div>
    );
  }
}


export default withStyles(styles)(LoginPage);