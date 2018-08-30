const express = require('express');
const authRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../settings/config');
require('../settings/passport')(passport);
const jwt = require('jsonwebtoken');

const User = require('../models/User');

authRouter.route('/signup/email')
    .post(function(req, res) {
        console.log(req.body);
        if(!req.body.name || !req.body.email || !req.body.password){
          return res.status(403).send({success: false, msg: "Arguments not correct"});
        }
        else{
          User.upsertUserEmail(req.body.name, req.body.email, req.body.password, function(err, user) {
              if(err){
                return res.status(403).send({success: false, msg: err});
              }
              else {
                console.log("success");
                let token = jwt.sign(user.toJSON(), config.secret);
                res.json({success: true, token: 'JWT ' + token, name: user.name, username: user.username});
              }
          });
        }
    });

authRouter.route('/login/email')
    .post(function(req, res){
        if(!req.body.email || !req.body.password){
            return res.status(403).send({success: false, msg: "Arguments not correct"});
        }
        User.checkUserEmail(req.body.email, req.body.password, function(err, user) {
            if (err) {
              return res.status(403).send({success: false, msg: err});
            }
            else {
              let token = jwt.sign(user.toJSON(), config.secret);
              res.json({success: true, token: 'JWT ' +token, name: user.name, username: user.username});
            } 
        });
    });

authRouter.get('/profile', passport.authenticate('jwt', { session: false}), function(req, res) {
  // console.log('headers' , req.headers)
  let token = getToken(req.headers);
  // console.log('token' , token);
  // console.log('user' , req.user);
  if (token) {
    return res.json({success: true, msg: 'authorized.', user: req.user});
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
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