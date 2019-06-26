const mongoose = require('mongoose')
const AuthZabbixSchema = new mongoose.Schema({
    "name": String
})

mongoose.model('AuthZabbix', AuthZabbixSchema, 'test')