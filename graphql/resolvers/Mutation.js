const _ = require('lodash')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')
const Items = mongoose.model('Items')
const Triggers = mongoose.model('Triggers')
const HistoryGetController = require('./../../modules/workers/factory')({typeObject: "HistoryGet"})

//TODO: провести рефакторинг, выделить в отдельные классы

module.exports = {
    createZabbixCli: async (parent, {input}) => {
        try {
            let data = await ZabbixCli.create(input)
            await HistoryGetController.createWorkers(data)
            return await data
        } catch (error) {
            return error
        }
    },
    updateZabbixCli: async (parent, {_id, input}) => {
        try {
             let updateZabbixCli = await ZabbixCli.findByIdAndUpdate(_id, input, {new: true})
            await HistoryGetController.updateWorkers(_id)
            return await updateZabbixCli
        } catch (e) {
            return e
        }
    },
    deleteZabbixCli: async (parent, {_id}) => {
        try {
            let elementDelete = await ZabbixCli.findByIdAndRemove(_id)
            await Items.deleteMany({ zabbixCliID: _id }, function (err) {
                if(err){
                    throw new Error(err)
                }
            })
            await HistoryGetController.deleteWorkers(_id)
            return await elementDelete
        } catch (e) {
            return e
        }
    },
    createItemsToZabbixCli: async (parent, {_id, input}) => {
        try{
            let result = await ZabbixCli.findById(_id)
            input.zabbixCliIDSchema = _id
            let newItems = await Items.create(input)
            await result.items.push(newItems._id)
            await result.save()

            HistoryGetController.updateWorkers(_id)

            return newItems
        } catch (e) {
            return e
        }
    },

    deleteItemsToZabbixCli: async (parent, args) => {
        try {
            let result = await ZabbixCli.findById(args._id)
            result.items = await _.remove(result.items, item => {
                return item === args.child_id
            })
            await result.save()
            await HistoryGetController.updateWorkers(args._id)
            return await Items.findByIdAndRemove(args.child_id)
        } catch (e) {
            return e
        }
    },

    createTriggersToItems: async (parent, {_id, input}) => {
        try{
            let result = await Items.findById(_id)
            input.ItemIDSchema = _id
            input.itemid = result.itemid
            let newTriggers = await Triggers.create(input)
            await result.triggers.push(newTriggers._id)
            await result.save()
            return newTriggers
        } catch (e) {
            return e
        }
    },

}
