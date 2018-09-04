const express = require('express');
const authRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../settings/config');
require('../settings/passport')(passport);
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Meeting = require('../models/Meeting');

authRouter.route('/login')
  .post(function(req, res){
      if(!req.body.username || !req.body.password){
          return res.status(403).send({success: false, msg: "Fill Up all details"});
      }
      User.checkUser(req.body.username, req.body.password, function(err, user) {
          if (err) {
            return res.status(403).send({success: false, msg: "server error"});
          }
          else {
            Meeting.getMeetingsOnDate(new Date(), function(err, meetings){
              if (err) {
                return res.status(403).send({success: false, msg: "server error"});
              }
              else{
                User.getUserlist(function(err, users){
                  if(err) {
                    return res.status(403).send({success: false, msg: "server error"});
                  }
                  else {
                    let token = jwt.sign(user.toJSON(), config.secret);
                    return res.json({success: true, token: 'JWT ' +token, name: user.name, username: user.username, 
                                      users: users, meetings: meetings});
                  }
                })
              }
            })
          } 
      });
  });

authRouter.get('/profile', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    return res.json({success: true, msg: 'authorized.', authorized: true, user: req.user});
  } else {
    return res.status(403).send({success: false, authorized: false, msg: 'Unauthorized.'});
  }
});

authRouter.post('/postmeeting', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    let User = {
                id: req.user._id,
                name: req.user.name,
                username: req.user.username
              };

    Meeting.insertMeeting(req.body, User, function(err, meeting){
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

authRouter.get('/meeting', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    User.getUserlist(function(err, users){
      if(err) {
        return res.status(403).send({success: false, authorized: true, msg: 'Server Error.'});
      }
      else {
        return res.json({success: true, authorized: true, user: req.user, meetingUsers: users});
      }
    })
  } else {
    return res.status(403).send({success: false, authorized: false, msg: 'Unauthorized.'});
  }
});

authRouter.post('/meetingsandusers', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Meeting.getMeetingsOnDate(req.body.date, function(err, meetings){
      if (err) {
        return res.status(403).send({success: false, authorized: true, msg: err});
      }
      else{
        User.getUserlist(function(err, users){
          if(err) {
            return res.status(403).send({success: false, authorized: true, msg: err});
          }
          else {
            return res.json({success: true, authorized: true, users: users, meetings: meetings});
          }
        })
      }
    })
  } else {
    return res.status(403).send({success: false, authorized: false, msg: "Unauthorized"});
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
        return res.json({success: true, authorized: true, meeting: meeting});
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