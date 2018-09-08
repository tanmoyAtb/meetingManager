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

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import UpcomingMeetings from '../LandingPages/UpcomingMeetings';
import UnresolvedMeetings from '../LandingPages/UnresolvedMeetings';
import HistoryMeetings from '../LandingPages/HistoryMeetings';
import AddMeeting from '../AddMeeting/AddMeeting';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 0 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: "column",
    padding: "16px 20%",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 12px",
    }
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  btn: {
    [theme.breakpoints.down("sm")]: {
      padding: 8, minWidth: 36
    }
  },
  button: {
    marginBottom: 16
  },
  label: {
    fontSize: 30,
    color: "#263238",
    position: 'relative'
  }
});

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  }


  render() {
    const { classes, theme } = this.props;
    return (
      <div >
        <div className={classes.container}>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label="UPCOMING MEETINGS" />
                <Tab label="UNRESOLVED MEETINGS" />
                <Tab label="MEETINGS HISTORY" />
                <Tab label="ADD MEETING" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer dir={theme.direction} >
                <UpcomingMeetings meetings={this.props.upcomingMeetings} mode={this.props.modeUpcoming} users={this.props.users} user={this.props.userUpcoming}
                onDateChange= {this.props.onUpcomingDateChange} onUserChange={this.props.onUserUpcomingChange} />
              </TabContainer>

              <TabContainer dir={theme.direction}>
                <UnresolvedMeetings meetings={this.props.unresolvedMeetings} mode={this.props.modeUnresolved} users={this.props.users} user={this.props.userUnresolved}
                onDateChange= {this.props.onUnresolvedDateChange} onUserChange={this.props.onUserUnresolvedChange}/>
              </TabContainer>

              <TabContainer dir={theme.direction}>
                <HistoryMeetings meetings={this.props.historyMeetings} mode={this.props.modeHistory} users={this.props.users} user={this.props.userHistory}
                onDateChange= {this.props.onDateHistoryChange} onUserChange={this.props.onUserHistoryChange}/>
              </TabContainer>

              <TabContainer dir={theme.direction}> 

                <AddMeeting attendees={this.props.users} onAddMeeting={this.props.onAddMeeting}/>

              </TabContainer>

            </SwipeableViews>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Body);