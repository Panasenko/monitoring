const mongoose = require('mongoose')

const EventsSchema = new mongoose.Schema({
    "TriggersIDSchema": {
        type: mongoose.Schema.Types.ObjectId
    },
    "description": {
        type: String
    },
    "itemid": {
        type: String,
        required: true
    },
    "status": {
        type: String,
        required: true
    },
    "level": {
        type: String,
        required: true
    },
    "eventTimeStart": {
        type: Date,
        required: true
    },
    "eventTimeUpdate": {
        type: Date,
        required: true
    },
    "eventTimeNormalized": {
        type: Date
    },
    "eventTimeClose": {
        type: Date
    },
    "lastClock": {
        type: Number
    },
    "lastValue": {
        type: Number
    },
    "historyChange": [{
        type: String
    }]
})

mongoose.model('EventsAlert', EventsSchema, 'eventsAlert')