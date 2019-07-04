const mongoose = require('mongoose')
const AuthZabbixSchema = new mongoose.Schema({
    "name": String,
    "discription": String,
    "url": String,
    "token": String
})

mongoose.model('AuthZabbix', AuthZabbixSchema, 'ZabbixCli')