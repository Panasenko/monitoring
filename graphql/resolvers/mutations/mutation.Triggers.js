const _ = require('lodash')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')
const Items = mongoose.model('Items')
const Triggers = mongoose.model('Triggers')
const HistoryGetController = require('./../../../modules/workers/factory')({typeObject: "HistoryGet"})

class TriggersMutation {

    async createTriggersToItems(parent, args) {
        try {
            let result = await Items.findById(args._id)
            args.input.ItemIDSchema = args._id
            args.input.zabbixCliIDSchema = result.zabbixCliIDSchema
            args.input.itemid = result.itemid
            let newTriggers = await Triggers.create(args.input)
            await result.triggers.push(newTriggers._id)
            await result.save()
            return newTriggers
        } catch (e) {
            return e
        }
    }

    async deleteTriggersToItems(parent, args) {
        try {
            let delTriggers = await Triggers.findByIdAndRemove(args._id)

            let result = await Items.findById(delTriggers.ItemIDSchema)
            result.triggers = await _.remove(result.triggers, triggers => {
                return triggers === args._id
            })
            await result.save()
            await HistoryGetController.updateWorkers(delTriggers.zabbixCliIDSchema)
            return delTriggers
        } catch (e) {
            return e
        }
    }

}

module.exports = TriggersMutation