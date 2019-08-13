const _ = require('lodash')
const ZabbixCliDB = require('../../../database/controllers/controll.ZabbixCli')

const HistoryGetController = require('./../../../modules/workers/factory')({typeObject: "HistoryGet"})

class ZabbixCliQuery {
    async zabbixCliFindById(parent, args) {
        return await ZabbixCliDB.findById(args._id)
    }

    async zabbixCliFind(parent, args) {
        return await ZabbixCliDB.find({})
    }

    getWorkers() {
        return HistoryGetController.getWorkers()
    }
}

module.exports = ZabbixCliQuery