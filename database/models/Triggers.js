const mongoose = require('mongoose')

const TriggersSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "description": {
        type: String
    },
    "url": {
        type: String,
        unique: true,
        required: true
    },
    "token": {
        type: String,
        required: true
    },
    "inProgress": {
        type: Boolean,
        default: false
    },
    "lastTime": {
        type: Number
    },
    "intervalTime": {
        type: Number
    },
    "items": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items'
    }]
})

mongoose.model('Triggers', TriggersSchema, 'triggers')