const mongoose = require('mongoose')

const ItemsSchema = new mongoose.Schema({
    "zabbixCliID": {
        type: mongoose.Schema.Types.ObjectId
    },
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
    "value_type": {
        type: String
    },
    "units": {
        type: String
    }

})

mongoose.model('Items', ItemsSchema, 'items')
