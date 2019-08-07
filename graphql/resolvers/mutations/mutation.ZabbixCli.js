const _ = require('lodash')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')
const Items = mongoose.model('Items')
const Triggers = mongoose.model('Triggers')
const HistoryGetController = require('./../../../modules/workers/factory')({typeObject: "HistoryGet"})

class ZabbixCliMutation {

    async createZabbixCli(parent, args) {
        try {
            let data = await ZabbixCli.create(args.input)
            await HistoryGetController.createWorkers(data)
            return await data
        } catch (error) {
            return error
        }
    }

    async updateZabbixCli(parent, args) {
        try {
            let updateZabbixCli = await ZabbixCli.findByIdAndUpdate(args._id, args.input, {new: true})
            await HistoryGetController.updateWorkers(args._id)
            return await updateZabbixCli
        } catch (e) {
            return e
        }
    }

    async deleteZabbixCli(parent, args) {
        try {
            let elementDelete = await ZabbixCli.findByIdAndRemove(args._id)
            await Items.deleteMany({zabbixCliIDSchema: args._id})
            await Triggers.deleteMany({zabbixCliIDSchema: args._id})
            await HistoryGetController.deleteWorkers(args._id)
            return await elementDelete
        } catch (e) {
            return e
        }
    }
}

module.exports = ZabbixCliMutation