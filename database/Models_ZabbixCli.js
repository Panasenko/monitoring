const mongoose = require('mongoose')
const ItemsSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "hostid": {
        type: String,
        required: true
    },
    "itemid": {
        type: String,
        unique: true,
        required: true
    },
    "description": {
        type: String
    }
})

const AuthZabbixSchema = new mongoose.Schema({
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
        type: String
    },
    "error": {
        type: Array
    },
    "isError": {
        type: Boolean,
        default: false
    },
    "items": [ItemsSchema]
})

mongoose.model('ZabbixCli', AuthZabbixSchema, 'ZabbixCli')