const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const TenderSchema = new Schema({
    published_datetime: {
        type: Date,
        required: true
    },
    last_datetime: {
        type: Date,
        required: true
    },
    dropping_datetime: {
        type: Date
    },
    opening_datetime: {
        type: Date
    },
    client: {
        type: String
    },
    work: {
        type: String
    },
    note: {
        type: String
    },
    link: {
        type: String
    },
    schedule_money: {
        type: Number
    },
    security_money: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    schedule_bought: {
        type: Boolean,
        default: false
    },
    schedule_dropped: {
        type: Boolean,
        default: false
    },
    work_rewarded: {
        type: Boolean,
        default: false
    }
    
});

TenderSchema.statics.insertTender = function(data, cb) {
    if(data.dateTimePublished && data.dateTimeLast && data.dateTimeDropping && data.dateTimeOpening 
        && data.client && data.work){

        const newTender = new this();

        newTender.published_datetime = data.dateTimePublished;
        newTender.last_datetime = data.dateTimeLast;
        newTender.dropping_datetime = data.dateTimeDropping;
        newTender.opening_datetime = data.dateTimeOpening ;
        newTender.work = data.work;
        newTender.client = data.client;
        newTender.note = data.note;
        newTender.link = data.link;
        newTender.schedule_money = data.scheduleMoney;
        newTender.security_money = data.securityMoney;

        newTender.save(function(err, tender) {
            if (err){
                console.log(err);
                cb(err, null);
            }
            else{
                cb(null, tender);
            }

        });
    }
    else {
        cb("Fill Up All Details", null);
    }
};

TenderSchema.statics.updateScheduleBought = function(id, cb) {
        

        var query   = { _id: id }; 
        var update  = { schedule_bought: true }; 

        var options = { new: true }; 

        this.findOneAndUpdate(query, update, options, function(err, savedTender){ 
            if (err) {
                cb("Server error", null);
            }else{
                return cb(null, savedTender);
            } 
        });
};

TenderSchema.statics.updateScheduleDropped = function(id, cb) {
        

        var query   = { _id: id }; 
        var update  = { schedule_dropped: true }; 

        var options = { new: true }; 

        this.findOneAndUpdate(query, update, options, function(err, savedTender){ 
            if (err) {
                cb("Server error", null);
            }else{
                return cb(null, savedTender);
            } 
        });
};

TenderSchema.statics.updateWorkRewarded = function(id, cb) {
        

        var query   = { _id: id }; 
        var update  = { work_rewarded: true }; 

        var options = { new: true }; 

        this.findOneAndUpdate(query, update, options, function(err, savedTender){ 
            if (err) {
                cb("Server error", null);
            }else{
                return cb(null, savedTender);
            } 
        });
};


TenderSchema.statics.getOngoingtenders = function(cb) {

    this.aggregate([
         
        {
            $match : {
                last_datetime: {"$gte": new Date()}
            }
        },
        { 
            $sort : { 
                last_datetime : 1 
            } 
        }

     ], function(err, tenders){
            if (err) cb("server error", null);
            else {
                cb(null, tenders);
            }
    })
    
};

TenderSchema.statics.getBoughtTenders = function(cb) {


    this.aggregate([
         
        {
            $match : {
                schedule_bought : true 
            }
        },
        { 
            $sort : { 
                last_datetime : 1 
            } 
        }

     ], function(err, tenders){
            if (err) cb("server error", null);
            else {
                cb(null, tenders);
            }
    })
    
};

TenderSchema.statics.getDroppedTenders = function(cb) {

    this.aggregate([
         
        {
            $match : {
                schedule_dropped : true
            }
        },
        { 
            $sort : { 
                last_datetime : 1 
            } 
        }

     ], function(err, tenders){
            if (err) cb("server error", null);
            else {
                cb(null, tenders);
            }
    })
};

TenderSchema.statics.getRewardedTenders = function(cb) {

    this.aggregate([
         
        {
            $match : {
                work_rewarded : true
            }
        },
        { 
            $sort : { 
                last_datetime : 1 
            } 
        }

     ], function(err, tenders){
            if (err) cb("server error", null);
            else {
                cb(null, tenders);
            }
    })
};

TenderSchema.statics.onEditNote = function(id, note, cb) {

    var query   = { _id: id }; 
    var update  = { note: note }; 
    var options = { new: true }; 
    this.findOneAndUpdate(query, update, options, function(err, savedTender){ 
        if (err) {
            cb("Server error", null);
        }else{
            return cb(null, savedTender);
        } 
    });
}

TenderSchema.statics.updateDoneSummary = function(id, summary, cb) {

    
    
};

TenderSchema.statics.getAllTenders = function(cb) {

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
    ], function (err, tenders) {
        if (err) {
            console.log(err);
            cb(err, null);
        }
        else {
            cb(null, tenders);
        }
    });
    
};

TenderSchema.statics.deleteTenderOnId = function(id, cb) {

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




module.exports = mongoose.model('Tender', TenderSchema);
