const _ = require('lodash')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')
const Items = mongoose.model('Items')
const Triggers = mongoose.model('Triggers')
const HistoryGetController = require('./../../../modules/workers/factory')({typeObject: "HistoryGet"})

class ItemsMutation {

    async createItemsToZabbixCli(parent, args) {
        try {
            let result = await ZabbixCli.findById(args._id)
            args.input.zabbixCliIDSchema = args._id
            let newItems = await Items.create(args.input)
            await result.items.push(newItems._id)
            await result.save()

            HistoryGetController.updateWorkers(args._id)

            return newItems
        } catch (e) {
            return e
        }
    }

    async deleteItemsToZabbixCli(parent, args) {
        try {
            let delItems = await Items.findByIdAndRemove(args._id)
            await Triggers.deleteMany({ItemIDSchema: delItems.ItemIDSchema})
            let result = await ZabbixCli.findById(delItems.zabbixCliIDSchema)
            result.items = await _.remove(result.items, item => {
                return item === args._id
            })
            await result.save()
            await HistoryGetController.updateWorkers(delItems.zabbixCliIDSchema)
            return delItems
        } catch (e) {
            return e
        }
    }

}

module.exports = ItemsMutation