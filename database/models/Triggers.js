const mongoose = require('mongoose')

const TriggersSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "description": {
        type: String
    },
    "itemid": {
        type: String,
        required: true
    },
    "closeTime": {
        type: Number,
        required: true
    },
    "disaster": {
        type: String,
        default: null
    },
    "high": {
        type: String,
        default: null
    },
    "average": {
        type: String,
        default: null
    },
    "warning": {
        type: String,
        default: null
    },
    "information": {
        type: String,
        default: null
    },
    "ItemIDSchema": {
        type: mongoose.Schema.Types.ObjectId
    },
})

mongoose.model('Triggers', TriggersSchema, 'triggers')