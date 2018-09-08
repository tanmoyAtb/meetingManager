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
    console.log("upcoming");
    Meeting.getUpcomingMeetings(function(err, meetings){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: 'Server Error.'});
      }
      else {
        console.log("upcoming", meetings);
        return res.json({success: true, authorized: true, user: req.user, meetings: meetings});
      }
    })
  
});

authRouter.get('/unresolvedmeetings', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log("unresolved");
    Meeting.getUnresolvedMeetings(function(err, meetings){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: 'Server Error.'});
      }
      else {
        console.log("unresolved", meetings);
        return res.json({success: true, authorized: true, user: req.user, meetings: meetings});
      }
    })
  
});

authRouter.get('/historymeetings', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log("history");
    Meeting.getHistoryMeetings(function(err, meetings){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: 'Server Error.'});
      }
      else {
        console.log("history", meetings);
        return res.json({success: true, authorized: true, user: req.user, meetings: meetings});
      }
    })
  
});


authRouter.post('/editmeeting', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Meeting.updateMeeting(req.body.id, req.body.data, function(err, meeting){
      if (err) {
        return res.status(403).send({success: false, authorized: true, msg: 'Server Error.'});
      }
      else {
        return res.json({success: true, authorized: true, meeting: meeting});
      }
    })
  } 
  else {
    return res.status(403).send({success: false, authorized: false, msg: 'Unauthorized.'});
  }
});

authRouter.post('/nextmeeting', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    let User = {
                id: req.user._id,
                name: req.user.name,
                username: req.user.username
              };

    Meeting.insertNextMeeting(req.body.prevMeeting, req.body.data, User, function(err, meeting){
      if (err) {
        return res.status(403).send({success: false, authorized: true, msg: 'Server Error.'});
      }
      else {
        return res.json({success: true, authorized: true, meeting: meeting});
      }
    })
  } 
  else {
    return res.status(403).send({success: false, authorized: false, msg: 'Unauthorized.'});
  }
});


authRouter.get('/meeting/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Meeting.getMeetingOnId(req.params.id, function(err, meeting){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: err});
      }
      else {
        return res.json({success: true, authorized: true, name: req.user.name, username: req.user.username, meeting: meeting});
      }
    })
  } else {
    return res.status(403).send({success: false, authorized: false, msg: "Unauthorized"});
  }
});

authRouter.get('/deletemeeting/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Meeting.deleteMeetingOnId(req.params.id, function(err){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: err});
      }
      else {
        return res.json({success: true, authorized: true});
      }
    })
  } else {
    return res.status(403).send({success: false, authorized: false, msg: err});
  }
});

authRouter.post('/meeting/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Meeting.updateDoneSummary(req.params.id, req.body.summary, function(err, meeting){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: err});
      }
      else {
        return res.json({success: true, authorized: true, meeting: meeting});
      }
    })
  } else {
    return res.status(403).send({success: false, authorized: false, msg: "Unauthorized"});
  }
});

authRouter.post('/posttender', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Tender.insertTender(req.body, function(err, tender){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: err});
      }
      else {
        return res.json({success: true, authorized: true, tender: tender});
      }
    })
  } else {
    return res.status(403).send({success: false, authorized: false, msg: "Unauthorized"});
  }
});

authRouter.get('/ongoingtenders', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Tender.getOngoingtenders(function(err, tenders){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: err});
      }
      else {
        return res.json({success: true, authorized: true, tenders: tenders});
      }
    })
  } else {
    return res.status(403).send({success: false, authorized: false, msg: "Unauthorized"});
  }
});

authRouter.post('/updateschedulebought', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Tender.updateScheduleBought(req.body.id, function(err, tender){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: err});
      }
      else {
        return res.json({success: true, authorized: true, tender: tender});
      }
    })
  } else {
    return res.status(403).send({success: false, authorized: false, msg: "Unauthorized"});
  }
});

authRouter.post('/updatescheduledropped', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Tender.updateScheduleDropped(req.body.id, function(err, tender){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: err});
      }
      else {
        return res.json({success: true, authorized: true, tender: tender});
      }
    })
  } else {
    return res.status(403).send({success: false, authorized: false, msg: "Unauthorized"});
  }
});

authRouter.post('/updateworkordered', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Tender.updateWorkOrdered(req.body.id, function(err, tender){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: err});
      }
      else {
        return res.json({success: true, authorized: true, tender: tender});
      }
    })
  } else {
    return res.status(403).send({success: false, authorized: false, msg: "Unauthorized"});
  }
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