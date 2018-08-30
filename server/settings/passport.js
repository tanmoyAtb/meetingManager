var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/User');
var config = require('../settings/config'); // get settings file
module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret; 
  
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log("payload", jwt_payload);
    User.findOne({_id: jwt_payload._id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
            
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
}