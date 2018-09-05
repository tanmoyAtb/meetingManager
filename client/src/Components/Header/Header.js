import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import styles from './headerStyle';

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.setState({ anchorEl: null });
    this.props.logout();
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar style={{padding: 0}}>
              <Button
                href="/"
                color="inherit"
                style={{color: '#FFF', fontFamily: 'Dekko', fontSize: 36, textTransform: 'none', padding: 4}}
                
                >
                MeetGo
              </Button>
              <div style={{flex: 1}}>
              </div>
              <div>
                <div style= {{display: 'flex'}}>
                  <Button
                    href="/add"
                    color="inherit"
                    variant="outlined">
                    Add Meeting
                  </Button>
                  <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    color="inherit" 
                    onClick={this.handleMenu}
                  >
                    <AccountCircle style={{marginLeft: 0}}/>
                  </Button>
                  
                </div>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.props.history.push("/meetings")}>Meetings History</MenuItem>
                  <MenuItem onClick={() => this.props.history.push("/tenders")}>Tender Notices</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout - 
                      <Typography variant="display1" style={{color: '#263238', fontSize: 12}} >
                           {" " + this.props.name} 
                      </Typography>
                  </MenuItem>
                </Menu>
              </div>
            
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);