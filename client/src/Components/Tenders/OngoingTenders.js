import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Loader from 'Components/Loader/Loader';
import CardTender from '../Card/CardTender';
import Axios from 'Utils/Axios';

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
          <Loader/>
        )
    }
    else{
      return (
        <div style={{marginTop: 24}}>
          {!this.props.tenders.length && "No Ongoing Tenders"

          }
          {this.props.tenders && 
            this.props.tenders.map(function(tender){
              return (
                  <CardTender key={tender._id} tender={tender} />
                )
            })
          }
        </div>
      );
    }
  }
}

export default withStyles(styles)(Ongoing);
