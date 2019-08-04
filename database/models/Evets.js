const mongoose = require('mongoose')

const EventsSchema = new mongoose.Schema({
    "eventID": {
        type: String,
        required: true,
        unique: true
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
        type: Number,
        required: true
    },
    "eventTimeClose": {
        type: Number
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

mongoose.model('Events', EventsSchema, 'events')