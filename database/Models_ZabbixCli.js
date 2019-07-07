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
    }
})

mongoose.model('AuthZabbix', AuthZabbixSchema, 'ZabbixCli')