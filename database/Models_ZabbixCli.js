const mongoose = require('mongoose')
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
})

mongoose.model('AuthZabbix', AuthZabbixSchema, 'ZabbixCli')