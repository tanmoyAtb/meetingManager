const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

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
    var that = this;
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

UserSchema.statics.getUserlist = function(cb) {
    var that = this;
    this.find(function(err, users) {
        if (err) cb("Server error", null);
        else{
            cb(null, users);
        }
    });
};


module.exports = mongoose.model('User', UserSchema);