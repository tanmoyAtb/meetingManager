const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const MeetingSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    time_from: {
        type: Date
    },
    time_to: {
        type: Date
    },
    client: {
        type: String
    },
    location: {
        type: String
    },
    attendees: [{
        id: {
            type: Schema.Types.ObjectId
        },
        name: {
            type: String
        },
        username: {
            type: String
        }
    }],
    description: {
        type: String
    },
    summary: {
        type: String
    },
    created_by: {
        id: {
            type: Schema.Types.ObjectId
        },
        name: {
            type: String
        },
        username: {
            type: String
        }
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

MeetingSchema.statics.insertMeeting = function(data, user, cb) {
    if(data.date && data.time && data.title && data.client && data.location && data.attendees.length && data.description){
        const newMeeting = new this();
        
        let newAttendees = [];
        data.attendees.forEach(function(attendee){
            newAttendees.push({id: attendee.id, name: attendee.label, username: attendee.value});
        })

        newMeeting.date = data.date;
        newMeeting.time = data.time;
        newMeeting.time_from = data.time_from;
        newMeeting.time_to = data.time_to;
        newMeeting.title = data.title;
        newMeeting.client = data.client;
        newMeeting.location = data.location;
        newMeeting.attendees = newAttendees;
        newMeeting.description = data.description;
        newMeeting.created_by = user;

        newMeeting.save(function(err, meeting) {
            if (err)
                cb(err, null);
            else{
                cb(null, meeting);
            }

        });
    }
    else {
        cb("Fill Up All Details", null);
    }
};


module.exports = mongoose.model('Meeting', MeetingSchema);