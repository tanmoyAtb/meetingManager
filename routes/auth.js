const express = require('express');
const authRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../settings/config');
require('../settings/passport')(passport);
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Meeting = require('../models/Meeting');
const Tender = require('../models/Tender');

authRouter.route('/login')
  .post(function(req, res){
      if(!req.body.username || !req.body.password){
          return res.status(500).send({success: false, msg: "Fill Up all details"});
      }
      User.checkUser(req.body.username, req.body.password, function(err, user) {
          if (err) {
            return res.status(500).send({success: false, msg: err});
          }
          else {
            let token = jwt.sign(user.toJSON(), config.secret);
            return res.json({success: true, token: 'JWT ' +token, name: user.name, username: user.username});
          } 
      });
  });

  
authRouter.get('/profile', passport.authenticate('jwt', { session: false}), function(req, res) {
  
  return res.json({success: true, authorized: true, user: req.user});
  
});

authRouter.post('/postmeeting', passport.authenticate('jwt', { session: false}), function(req, res) {

    Meeting.insertMeeting(req.body, function(err, meeting){
      if (err) {
        return res.status(500).send({success: false, msg: 'Server Error.'});
      }
      else {
        return res.json({success: true, meeting: meeting});
      }
    })
  
});


authRouter.get('/userslist', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    User.getUserlist(function(err, users){
      if(err) {
        return res.status(500).send({success: false, msg: 'Server Error.'});
      }
      else {
        return res.json({success: true, users: users});
      }
    })
});

authRouter.get('/upcomingmeetings', passport.authenticate('jwt', { session: false}), function(req, res) {
    
    Meeting.getUpcomingMeetings(function(err, meetings){
      if(err) {
        return res.status(500).send({success: false, msg: 'Server Error.'});
      }
      else {
        
        return res.json({success: true, meetings: meetings});
      }
    })
  
});

authRouter.get('/unresolvedmeetings', passport.authenticate('jwt', { session: false}), function(req, res) {
    
    Meeting.getUnresolvedMeetings(function(err, meetings){
      if(err) {
        return res.status(500).send({success: false, msg: 'Server Error.'});
      }
      else {
        
        return res.json({success: true, meetings: meetings});
      }
    })
  
});

authRouter.get('/historymeetings', passport.authenticate('jwt', { session: false}), function(req, res) {
    
    Meeting.getHistoryMeetings(function(err, meetings){
      if(err) {
        return res.status(500).send({success: false, msg: 'Server Error.'});
      }
      else {
        
        return res.json({success: true, meetings: meetings});
      }
    })
  
});


authRouter.post('/editmeeting', passport.authenticate('jwt', { session: false}), function(req, res) {
  
  Meeting.updateMeeting(req.body.id, req.body.data, function(err, meeting){
    if (err) {
      return res.status(500).send({success: false, msg: 'Server Error.'});
    }
    else {
      return res.json({success: true, meeting: meeting});
    }
  })
  
});

authRouter.post('/nextmeeting', passport.authenticate('jwt', { session: false}), function(req, res) {
  console.log("auth next meeting");
  Meeting.insertNextMeeting(req.body.prevMeeting, req.body.data, function(err, meeting){
      if (err) {
        return res.status(500).send({success: false, msg: 'Server Error.'});
      }
      else {
        return res.json({success: true, meeting: meeting});
      }
    })
  
});


authRouter.get('/meeting/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Meeting.getMeetingOnId(req.params.id, function(err, meeting){
      if(err) {
        return res.status(500).send({success: false, msg: err});
      }
      else {
        return res.json({success: true, name: req.user.name, username: req.user.username, meeting: meeting});
      }
    })
  
});

authRouter.post('/deletemeeting', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Meeting.deleteMeetingOnId(req.body.id, req.body.prevId, function(err){
      if(err) {
        return res.status(500).send({success: false, msg: err});
      }
      else {
        return res.json({success: true});
      }
    })
});

authRouter.post('/meeting/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Meeting.updateDoneSummary(req.params.id, req.body.summary, function(err, meeting){
      if(err) {
        return res.status(500).send({success: false,  msg: err});
      }
      else {
        return res.json({success: true,  meeting: meeting});
      }
    })
  
});

authRouter.post('/posttender', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Tender.insertTender(req.body, function(err, tender){
      if(err) {
        return res.status(500).send({success: false,  msg: err});
      }
      else {
        return res.json({success: true, tender: tender});
      }
    })
  
});

authRouter.get('/ongoingtenders', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Tender.getOngoingtenders(function(err, tenders){
      if(err) {
        return res.status(500).send({success: false, msg: err});
      }
      else {
        return res.json({success: true, tenders: tenders});
      }
    })
  
});
  
authRouter.get('/boughttenders', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Tender.getBoughtTenders(function(err, tenders){
      if(err) {
        return res.status(500).send({success: false, msg: err});
      }
      else {
        return res.json({success: true, tenders: tenders});
      }
    })
  
});

authRouter.get('/droppedtenders', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Tender.getDroppedTenders(function(err, tenders){
      if(err) {
        return res.status(500).send({success: false, msg: err});
      }
      else {
        return res.json({success: true, tenders: tenders});
      }
    })
  
});  

authRouter.get('/rewardedtenders', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Tender.getRewardedTenders(function(err, tenders){
      if(err) {
        return res.status(500).send({success: false, msg: err});
      }
      else {
        return res.json({success: true, tenders: tenders});
      }
    })
  
});

authRouter.post('/updateschedulebought', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Tender.updateScheduleBought(req.body.id, function(err, tender){
      if(err) {
        return res.status(500).send({success: false,  msg: err});
      }
      else {
        return res.json({success: true,  tender: tender});
      }
    })
  
});

authRouter.post('/updatescheduledropped', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Tender.updateScheduleDropped(req.body.id, function(err, tender){
      if(err) {
        return res.status(500).send({success: false,  msg: err});
      }
      else {
        return res.json({success: true, tender: tender});
      }
    })
  
});

authRouter.post('/updateworkrewarded', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Tender.updateWorkRewarded(req.body.id, function(err, tender){
      if(err) {
        return res.status(500).send({success: false, msg: err});
      }
      else {
        return res.json({success: true, tender: tender});
      }
    })
  
});

authRouter.post('/editnotetender', passport.authenticate('jwt', { session: false}), function(req, res) {
  
    Tender.onEditNote(req.body.id, req.body.note, function(err, tender){
      if(err) {
        return res.status(500).send({success: false, msg: err});
      }
      else {
        return res.json({success: true, tender: tender});
      }
    })
  
});




getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
  } else {
      return null;
  }
} else {
    return null;
}
};


module.exports = authRouter;