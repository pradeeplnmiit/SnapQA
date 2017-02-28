/**
 * Created by OLA on 22/02/17.
 */

var mongoose= require('mongoose');
var bcrypt=require('bcrypt-nodejs');

var DealSchema = mongoose.Schema({
    clientName:{
        type: String,
        required: true
    },
    adminName:{
        type:String,
        required:true
    },
    enteredAt:{
        type: String
    },
    startDate:{
        type: Date
    },
    endDate:{
        type: Date
    },
    status:{
        type: Boolean
    },
    result:{
        type: Number
    },
    comments:{
        type: String
    },
    turnOnForTutor:{
        type: Boolean
    },
    subject:{
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Deal', DealSchema);
