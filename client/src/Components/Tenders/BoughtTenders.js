import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Loader from 'Components/Loader/Loader';
import CardTender from '../Card/CardTender';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: "8px 20%",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 12px",
    }
  },
});




class Ongoing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'wait',
      tenders: []
    };
  }


  render() {

    if(this.props.mode === 'wait'){
      return (
          <Loader tender/>
        )
    }
    else{
      let onBoughtSchedule = this.props.onBoughtSchedule;
      let onDroppedSchedule = this.props.onDroppedSchedule;
      let onRewardedWork = this.props.onRewardedWork;
      let onEditNote = this.props.onEditNote;
      let onDeleteTender = this.props.onDeleteTender;

      return (
        <div style={{marginTop: 24, padding: 1}}>
          {!this.props.tenders.length && "No Schedule Bought Tenders"

          }
          {this.props.tenders && 
            this.props.tenders.map(function(tender){
              return (
                  <CardTender mode="bought" key={tender._id} tender={tender} onEditNote={onEditNote}
                  onBoughtSchedule={onBoughtSchedule}  onDroppedSchedule= {onDroppedSchedule} onRewardedWork={onRewardedWork} 
                  onDeleteTender={onDeleteTender}/>
                )
            })
          }
        </div>
      );
    }
  }
}

export default withStyles(styles)(Ongoing);
