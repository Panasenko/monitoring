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
    },
    "zabbixCliID": {
        type: String
    }
})

mongoose.model('Items', ItemsSchema, 'items')
