const _ = require('lodash')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')
const HistoryGetController = require('./../../../modules/workers/factory')({typeObject: "HistoryGet"})

class ZabbixCliQuery {
    async zabbixCliFindById(parent, args) {
        try {
            return await ZabbixCli.findById(args._id).populate({
                path: 'items',
                model: 'Items',
                populate: {
                    path: 'triggers',
                    model: 'Triggers'
                }
            })
        } catch (e) {
            throw new Error(e)
        }
    }

    async zabbixCliFind(parent, args) {
        try {
            return await ZabbixCli.find({}).populate({
                path: 'items',
                model: 'Items',
                populate: {
                    path: 'triggers',
                    model: 'Triggers'
                }
            })
        } catch (e) {
            throw new Error(e)
        }
    }

    getWorkers() {
        return HistoryGetController.getWorkers()
    }
}

module.exports = ZabbixCliQuery