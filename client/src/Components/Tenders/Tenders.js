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

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import OngoingTenders from './OngoingTenders';

import AddTender from './AddTender';

import styles from './tendersStyle';

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

class Tenders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'wait',
      name: '',
      username: '',
      showAddTender: true,
      value: 0,
      newTenders: [],
      modeOngoing: 'wait',
      tendersOngoing: []
    };
  }

  addTender = (e) => {
    this.setState({showAddTender: true});
  }

  closeAddTender = (e) => {
    this.setState({showAddTender: false});
  }

  handleLogout = (e) => {
      let that = this;
      Axios.logout(function(){
        that.props.history.push('/');
      })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  }

  gotNewTender = (tender) => {
    this.setState({modeOngoing: 'wait', tendersOngoing: []});
    this.loadOngoing();
  }

  componentDidMount() {
      let that=this;
      Axios.getProfile(function(err, data){
        if (err) {
          console.log(err);
          if(err === 'unauthorized') that.props.history.push("/");
        }
        else {
          that.loadOngoing();
          that.setState({mode: 'details', name: data.user.name, username: data.user.username});
        }
      })
  }

  loadOngoing = () => {
     let that=this;
      Axios.getOngoingTenders(function(err, data){
        if (err) {
          console.log(err);
          if(err === 'unauthorized') that.props.history.push("/");
        }
        else {
          that.setState({modeOngoing: 'details', tendersOngoing: data.tenders});
        }
      })
  }


  render() {
    const { classes, theme } = this.props;
    return (
      <div >
        <Header logout={this.handleLogout} history={this.props.history} name={this.state.name}/>
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
                <Tab label="ONGOING TENDERS" />
                <Tab label="SCHEDULE BOUGHT" />
                <Tab label="SCHEDULE DROPPED" />
                <Tab label="WORK ORDERED" />
                <Tab label="ADD TENDER" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer dir={theme.direction} >
                <OngoingTenders tenders={this.state.tendersOngoing} mode={this.state.modeOngoing}/>
              </TabContainer>

              <TabContainer dir={theme.direction}>SCHEDULE BOUGHT</TabContainer>

              <TabContainer dir={theme.direction}>SCHEDULE DROPPED</TabContainer>

              <TabContainer dir={theme.direction}>WORK ORDERED</TabContainer>

              <TabContainer dir={theme.direction}> 

                <AddTender gotNewTender={this.gotNewTender}/>

              </TabContainer>

            </SwipeableViews>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Tenders);