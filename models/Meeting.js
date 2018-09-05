const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

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
    title: {
        type: String
    },
    client: {
        type: String
    },
    location: {
        type: String
    },
    meeting_next: {
        id: {
            type: Schema.Types.ObjectId,
            default: null
        },
        date: {
            type: Date,
        },
        title: {
            type: String
        },
        client: {
            type: String
        }
    },
    meeting_previous: {
        id: {
            type: Schema.Types.ObjectId,
            default: null
        },
        date: {
            type: Date,
        },
        title: {
            type: String
        },
        client: {
            type: String
        },
    },
    attendees: [{
        id: {
            type: Schema.Types.ObjectId,
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
    },
    done: {
        type: Boolean,
        default: false
    }
});

MeetingSchema.statics.insertMeeting = function(data, user, cb) {
    if(data.date && data.time && data.title && data.client && data.location && data.attendees.length && data.description){
        const newMeeting = new this();
        
        let newAttendees = [];
        data.attendees.forEach(function(attendee){
            newAttendees.push({id: attendee.id, name: attendee.label, username: attendee.value});
        })

        let date = new Date(data.date);
        date.setHours(0,0,0,0);

        let time = new Date(data.time);
        time.setFullYear(1970, 0, 1);

        let time_from; 
        if(data.time_from) {
            time_from= new Date(data.time_from);
            time_from.setFullYear(1970, 0, 1);
        }

        let time_to;
        if(data.time_to) {
            time_to= new Date(data.time_to);
            time_to.setFullYear(1970, 0, 1);
        }

        newMeeting.date = date;
        newMeeting.time = time;
        newMeeting.time_from = time_from;
        newMeeting.time_to = time_to;
        newMeeting.title = data.title;
        newMeeting.client = data.client;
        newMeeting.location = data.location;
        newMeeting.attendees = newAttendees;
        newMeeting.description = data.description;
        newMeeting.created_by = user;

        newMeeting.save(function(err, meeting) {
            if (err){
                console.log(err);
                cb(err, null);
            }
            else{
                cb(null, meeting);
            }

        });
    }
    else {
        cb("Fill Up All Details", null);
    }
};

MeetingSchema.statics.insertNextMeeting = function(prevMeeting, data, user, cb) {
    if(data.date && data.time && data.title && data.client && data.location && data.attendees.length && data.description && 
        prevMeeting.id && prevMeeting.date && prevMeeting.title && prevMeeting.client){

        const newMeeting = new this();
        
        let newAttendees = [];
        data.attendees.forEach(function(attendee){
            newAttendees.push({id: attendee.id, name: attendee.label, username: attendee.value});
        })

        
        let date = new Date(data.date);
        date.setHours(0,0,0,0);

        let time = new Date(data.time);
        time.setFullYear(1970, 0, 1);

        let time_from; 
        if(data.time_from) {
            time_from= new Date(data.time_from);
            time_from.setFullYear(1970, 0, 1);
        }

        let time_to;
        if(data.time_to) {
            time_to= new Date(data.time_to);
            time_to.setFullYear(1970, 0, 1);
        }

        newMeeting.date = date;
        newMeeting.time = time;
        newMeeting.time_from = time_from;
        newMeeting.time_to = time_to;
        newMeeting.title = data.title;
        newMeeting.client = data.client;
        newMeeting.location = data.location;
        newMeeting.attendees = newAttendees;
        newMeeting.description = data.description;
        newMeeting.created_by = user;

        newMeeting.meeting_previous = prevMeeting;
        let that=this;
        
        newMeeting.save(function(err, meeting) {
            if (err)
                return cb(err, null);
            else{
                var query   = { _id: prevMeeting.id }; 
                var update  = { "meeting_next.id": meeting._id, 
                                "meeting_next.date": meeting.date, 
                                "meeting_next.title": meeting.title, 
                                "meeting_next.client": meeting.client
                            }; 

                var options = { new: true }; 

                that.findOneAndUpdate(query, update, options, function(err, savedMeeting){ 
                    if (err) {
                        return cb("Server error", null);
                    }else{
                        return cb(null, savedMeeting);
                    } 
                });
            }

        });
    }
    else {
        cb("Fill Up All Details", null);
    }
};

MeetingSchema.statics.updateMeeting = function(id, data, cb) {
    if(id && data.date && data.time && data.title && data.client && data.location && data.attendees.length && data.description){
        
        let newAttendees = [];
        data.attendees.forEach(function(attendee){
            newAttendees.push({id: attendee.id, name: attendee.label, username: attendee.value});
        })

        var query   = { _id: id }; 
        var update  = { date: data.date, 
                        time: data.time, 
                        time_from: data.time_from, 
                        time_to: data.time_to,
                        title: data.title,
                        client: data.client,
                        location: data.location,
                        attendees: newAttendees,
                        description: data.description 
                    }; 

        var options = { new: true }; 

        this.findOneAndUpdate(query, update, options, function(err, savedMeeting){ 
            if (err) {
                cb("Server error", null);
            }else{
                return cb(null, savedMeeting);
            } 
        });

    }
    else {
        cb("Fill Up All Details", null);
    }
};

MeetingSchema.statics.getMeetingsOnDate = function(date, cb) {
    if(date instanceof Date){

        date.setHours(0,0,0,0);
        let nextDate = moment(date).add(1,'days');
        nextDate = nextDate.toDate();

        this.find({date: {"$gte": date, "$lt": nextDate}}).sort({time: 1}).exec(function(err, meetings) { 
            if (err) {
                cb("server error", null);
            }
            else {
                cb(null, meetings);
            }
        });
    }
    else {
        let newDate = new Date(date);
        if(newDate instanceof Date){

            newDate.setHours(0,0,0,0);
            let nextDate = moment(newDate).add(1,'days');
            nextDate = nextDate.toDate();

            this.find({date: {"$gte": newDate, "$lt": nextDate}}).sort({time: 1}).exec(function(err, meetings) { 
                if (err) {
                    cb("server error", null);
                }
                else {
                    cb(null, meetings);
                }
            });
        }
        else {
            cb("Invalid Date", null);
        }
        
    }
};

MeetingSchema.statics.getMeetingOnId = function(id, cb) {

    this.findOne({_id : id}, function(err, meeting){
        if (err) cb("server error", null);
        else {
            cb(null, meeting);
        }

    })
    
};

MeetingSchema.statics.getAllMeetings = function(cb) {

    this.aggregate([
        {
            $sort : {
                time: -1
            }
        },
        {
            $group: {
              _id: "$date",
              entries: { $push: "$$ROOT" }
            }
        }
    ], function (err, meetings) {
        if (err) {
            console.log(err);
            cb(err, null);
        }
        else {
            cb(null, meetings);
        }
    });
    
};

MeetingSchema.statics.deleteMeetingOnId = function(id, cb) {

    this.remove({_id : id}, function(err){
        if (err) {
            console.log(err);
            cb("server error");
        }
        else {
            console.log("deleted");
            cb(null);
        }

    })
    
};

MeetingSchema.statics.updateDoneSummary = function(id, summary, cb) {

    var query   = { _id: id }; 
    var update  = { done: true, summary: summary }; 
    var options = { new: true }; 
    this.findOneAndUpdate(query, update, options, function(err, savedMeeting){ 
        if (err) {
            cb("Server error", null);
        }else{
            return cb(null, savedMeeting);
        } 
    });
    
};


module.exports = mongoose.model('Meeting', MeetingSchema);
