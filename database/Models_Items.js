const mongoose = require('mongoose')
const ItemsZabbixSchema = new mongoose.Schema({
    "url": String,
    "discription": String,
    "url": String,
    "token": String
})

mongoose.model('ItemsZabbix', ItemsZabbixSchema, 'Items')