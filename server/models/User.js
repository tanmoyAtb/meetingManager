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
    return this.findOne({ username: username}, function(err, user) {
        if (err) cb("Server error", null);
        console.log(username);
        if (!user) {
            cb("User not found", null);
        } else {
            // check if password matches
            if(password == user.password){
                cb(null, user)
            }
            else {
                cb("Username & Password don't match", null)
            }
        }
    });
};


module.exports = mongoose.model('User', UserSchema);