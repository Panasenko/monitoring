const mongoose = require('mongoose')
const AuthZabbixSchema = new mongoose.Schema({
    "name": String,
    "discription": String,
    "zabbix_URL": String,
    "token": String,
    "hash": String
})

mongoose.model('AuthZabbix', AuthZabbixSchema, 'test')