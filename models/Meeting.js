const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const MeetingSchema = new Schema({
    datetime: {
        type: Date,
        required: true
    },
    datetime_from: {
        type: Date
    },
    datetime_to: {
        type: Date
    },
    title: {
        type: String
    },
    client: {
        type: String
    },
    organization: {
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
        datetime: {
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
        datetime: {
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
    created_date: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: false
    }
});

MeetingSchema.statics.insertMeeting = function(data, cb) {
    if(data.title && data.client && data.location && data.attendees.length && data.description && Date.parse(data.datetime)) {
        const newMeeting = new this();
        
        let newAttendees = [];
        data.attendees.forEach(function(attendee){
            newAttendees.push({id: attendee.id, name: attendee.label, username: attendee.value});
        })

        newMeeting.datetime = data.datetime;
        newMeeting.datetime_from = data.datetime_from;
        newMeeting.datetime_to = data.datetime_to;
        newMeeting.title = data.title;
        newMeeting.client = data.client;
        newMeeting.organization = data.organization;
        newMeeting.location = data.location;
        newMeeting.attendees = newAttendees;
        newMeeting.description = data.description;

        newMeeting.save(function(err, meeting) {
            if (err){
                console.log(err);
                cb(err, null);
            }
            else{
                console.log(meeting);
                cb(null, meeting);
            }

        });
    }
    else {
        cb("Fill Up All Details", null);
    }
};

MeetingSchema.statics.insertNextMeeting = function(prevMeeting, data, cb) {
    if(data.title && data.client && data.location && data.attendees.length && data.description && Date.parse(data.datetime) && 
        prevMeeting.id && prevMeeting.datetime && prevMeeting.title && prevMeeting.client){

        const newMeeting = new this();
        
        let newAttendees = [];
        data.attendees.forEach(function(attendee){
            newAttendees.push({id: attendee.id, name: attendee.label, username: attendee.value});
        })


        newMeeting.datetime = data.datetime;
        newMeeting.datetime_from = data.datetime_from;
        newMeeting.datetime_to = data.datetime_to;
        newMeeting.title = data.title;
        newMeeting.client = data.client;
        newMeeting.organization = data.organization;
        newMeeting.location = data.location;
        newMeeting.attendees = newAttendees;
        newMeeting.description = data.description;

        newMeeting.meeting_previous = prevMeeting;

        let that=this;
        
        newMeeting.save(function(err, meeting) {
            if (err)
                return cb(err, null);
            else{
                var query   = { _id: prevMeeting.id }; 
                var update  = { "meeting_next.id": meeting._id, 
                                "meeting_next.datetime": meeting.datetime, 
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

MeetingSchema.statics.getUpcomingMeetings = function(cb) {

    this.aggregate([
        {
            $match : {
                datetime : {"$gte" : new Date()}, 
                done: false
            }
        },
        {
            $sort : {
                datetime: 1
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

MeetingSchema.statics.getUnresolvedMeetings = function(cb) {

    this.aggregate([
        {
            $match : {
                datetime : {"$lt" : new Date()}, 
                done: false
            }
        },
        {
            $sort : {
                datetime: 1
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

MeetingSchema.statics.getHistoryMeetings = function(cb) {

    this.aggregate([
        {
            $match : {
                done: true
            }
        },
        {
            $sort : {
                datetime: -1
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

MeetingSchema.statics.updateMeeting = function(id, data, cb) {
    console.log(data);
    if(id && data.datetime && data.title && data.client && data.location && data.attendees.length && data.description){
        
        let newAttendees = [];
        data.attendees.forEach(function(attendee){
            newAttendees.push({id: attendee.id, name: attendee.label, username: attendee.value});
        })

        console.log("edit", data);

        var query   = { _id: id }; 
        var update  = { datetime: data.datetime, 
                        datetime_from: data.datetime_from, 
                        datetime_to: data.datetime_to,
                        title: data.title,
                        client: data.client,
                        organization: data.organization,
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
        if (err) {console.log(err); cb(null, null);}
        else {
            console.log(meeting);
            cb(null, meeting);
        }

    })
    
};

MeetingSchema.statics.deleteMeetingOnId = function(id, prevId, cb) {
    var query   = { _id: prevId }; 
    var update  = { "meeting_next.id": null, 
                    "meeting_next.datetime": null, 
                    "meeting_next.title": null, 
                    "meeting_next.client": null }; 

    var options = { new: true }; 
    let that = this;

    if(prevId) {

        this.findOneAndUpdate(query, update, options, function(err, savedMeeting){ 
            if (err) {
                cb("Server error", null);
            }else{
                that.remove({_id : id}, function(err){
                if (err) {
                    console.log(err);
                    cb("server error");
                }
                else {
                    console.log("deleted");
                    cb(null);
                }

            })
    
            } 
        }); 
    }
    else {
        that.remove({_id : id}, function(err){
            if (err) {
                console.log(err);
                cb("server error");
            }
            else {
                console.log("deleted");
                cb(null);
            }
        })
    }
    
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
