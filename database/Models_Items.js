const mongoose = require('mongoose')
const ItemsZabbixSchema = new mongoose.Schema({
    "zabbixCli_id": {
        type: String,
        required: true
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
        required: true
    },
    "description": {
        type: String
    },
    "inProgress": {
        type: Boolean,
        default: false
    }
})

mongoose.model('ItemsZabbix', ItemsZabbixSchema, 'Items')