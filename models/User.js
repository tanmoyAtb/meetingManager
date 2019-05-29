const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

UserSchema.statics.checkUser = function(username, password, cb) {
    this.findOne({ username: username}, function(err, user) {
        if (err) cb("Server error", null);
        if (!user) {
            cb("User not found", null);
        } else {
            if(password == user.password){
                cb(null, user)
            }
            else {
                cb("Username & Password don't match", null)
            }
        }
    });
};

UserSchema.statics.signupUser = function(name, username, password, cb) {
  let newUser = new this({
    name, username, password
  })
  newUser.save().then(user => {
    cb(null, user)
  }).catch(err => {
    cb("server error", null);
  })
};

UserSchema.statics.getUserlist = function(cb) {
    this.find(function(err, users) {
        if (err) cb("Server error", null);
        else{
            cb(null, users);
        }
    });
};


module.exports = mongoose.model('User', UserSchema);
