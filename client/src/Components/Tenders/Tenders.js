import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';
import Typography from '@material-ui/core/Typography';
import Axios from 'Utils/Axios';

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import OngoingTenders from './OngoingTenders';
import BoughtTenders from './BoughtTenders';
import DroppedTenders from './DroppedTenders';
import RewardedTenders from './RewardedTenders';

import AddTender from './AddTender';

import styles from './tendersStyle';


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
      tendersOngoing: [],

      modeBought: 'wait',
      tendersBought: [],

      modeDropped: 'wait',
      tendersDropped: [],

      modeRewarded: 'wait',
      tendersRewarded: []
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
        if(err) {
          console.log(err);
          if(err.includes("unauthorized")) that.history.push("/");
        }
        else {
          
          that.setState({mode: 'details', name: data.name, username: data.username});
          that.loadOngoing();
          that.loadBought();
          that.loadDropped();
          that.loadRewarded();
        }
      })
  }

  loadRewarded = () => {
     let that=this;
      Axios.getRewardedTenders(function(err, data){
        if(err) {
          console.log(err);
          if(err.includes("unauthorized")) that.history.push("/");
        }
        else {
          that.setState({modeRewarded: 'details', tendersRewarded: data.tenders});
        }
      })
  }

  onBoughtSchedule = () => {
    this.setState({modeOngoing: 'wait', modeBought: 'wait', tendersOngoing:[], tendersBought: []});
    this.loadOngoing();
    this.loadBought();
  }

  onDroppedSchedule = () => {
    this.setState({modeDropped: 'wait', modeBought: 'wait', tendersDropped: [], tendersBought: []});
    this.loadBought();
    this.loadDropped();
  }

  onRewardedWork = () => {
    this.setState({modeRewarded: 'wait', modeDropped: 'wait', tendersRewarded: [], tendersDropped: []});
    this.loadDropped();
    this.loadRewarded();
  }

  loadOngoing = () => {
     let that=this;
      Axios.getOngoingTenders(function(err, data){
        if(err) {
          console.log(err);
          if(err.includes("unauthorized")) that.history.push("/");
        }
        else {
          that.setState({modeOngoing: 'details', tendersOngoing: data.tenders});
        }
      })
  }

  loadBought = () => {
     let that=this;
      Axios.getBoughtTenders(function(err, data){
        if(err) {
          console.log(err);
          if(err.includes("unauthorized")) that.history.push("/");
        }
        else {
          that.setState({modeBought: 'details', tendersBought: data.tenders});
        }
      })
  }

  loadDropped = () => {
     let that=this;
      Axios.getDroppedTenders(function(err, data){
        if(err) {
          console.log(err);
          if(err.includes("unauthorized")) that.history.push("/");
        }
        else {
          that.setState({modeDropped: 'details', tendersDropped: data.tenders});
        }
      })
  }

  onEditNote = (id, note) => {
    let tendersOn = this.state.tendersOngoing;

    tendersOn.forEach(function(tender){
      if(tender._id === id){
        tender.note = note;
      }
    })

    let tendersBo = this.state.tendersBought;

    tendersBo.forEach(function(tender){
      if(tender._id === id){
        tender.note = note;
      }
    })

    let tendersDr = this.state.tendersDropped;

    tendersDr.forEach(function(tender){
      if(tender._id === id){
        tender.note = note;
      }
    })

    let tendersRe = this.state.tendersRewarded;

    tendersRe.forEach(function(tender){
      if(tender._id === id){
        tender.note = note;
      }
    })

    this.setState({
      tendersOngoing: tendersOn,
      tendersBought: tendersBo,
      tendersDropped: tendersDr,
      tendersRewarded: tendersRe
    })
  }



  render() {
    const { classes, theme } = this.props;
    return (
      <div >
        <Header tender logout={this.handleLogout} history={this.props.history} name={this.state.name}/>
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
                <Tab label="WORK REWARDED" />
                <Tab label="ADD TENDER" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer dir={theme.direction} >
                <OngoingTenders onBoughtSchedule={this.onBoughtSchedule}  onDroppedSchedule= {this.onDroppedSchedule} onRewardedWork= {this.onRewardedWork}
                                tenders={this.state.tendersOngoing} mode={this.state.modeOngoing} onEditNote={this.onEditNote} />
              </TabContainer>

              <TabContainer dir={theme.direction} >
                <BoughtTenders onDroppedSchedule={this.onDroppedSchedule} onBoughtSchedule= {this.onBoughtSchedule} onRewardedWork= {this.onRewardedWork}
                                tenders={this.state.tendersBought} mode={this.state.modeBought} onEditNote={this.onEditNote}/>
              </TabContainer>

              <TabContainer dir={theme.direction} >
                <DroppedTenders onRewardedWork={this.onRewardedWork} onBoughtSchedule= {this.onBoughtSchedule} onDroppedSchedule= {this.onDroppedSchedule}
                                tenders={this.state.tendersDropped} mode={this.state.modeDropped} onEditNote={this.onEditNote}/>
              </TabContainer>
              
              <TabContainer dir={theme.direction} >
                <RewardedTenders onRewardedWork={this.onRewardedWork} onBoughtSchedule= {this.onBoughtSchedule} onDroppedSchedule= {this.onDroppedSchedule}
                                  tenders={this.state.tendersRewarded} mode={this.state.modeRewarded} onEditNote={this.onEditNote}/>
              </TabContainer>
              
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