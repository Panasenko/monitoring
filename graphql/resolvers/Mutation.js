const _ = require('lodash')
const HistoryGetController = require('./../../modules/workers/factory')({typeObject: "HistoryGet"})
const ZabbixCliDB = require('./../../database/controllers/ZabbixCli')
const ItemsDB = require('./../../database/controllers/Items')

module.exports = {
    createZabbixCli: async (parent, {input}) => {
        let data = await ZabbixCliDB.create(input)
        await HistoryGetController.createWorkers(data)
        return await data
    },

    updateZabbixCli: async (parent, {_id, input}) => {
        let updateZabbixCli = await ZabbixCliDB.findByIdAndUpdate(_id, input)
        await HistoryGetController.updateWorkers(_id)
        return await updateZabbixCli
    },

    deleteZabbixCli: async (parent, {_id}) => {
        let elementDelete = await ZabbixCliDB.findByIdAndRemove(_id)
        await ItemsDB.deleteMany({zabbixCliID: _id})
        await HistoryGetController.deleteWorkers(_id)
        return await elementDelete
    },

    createItemsToZabbixCli: async (parent, {_id, input}) => { //TODO: добавить метод обновления
        let result = await ZabbixCliDB.findById(_id)
        input.zabbixCliIDSchema = _id
        let newItems = await ItemsDB.create(input)
        await result.items.push(newItems._id)
        await result.save()
        HistoryGetController.updateWorkers(_id)
        return newItems
    },

    deleteItemsToZabbixCli: async (parent, args) => {
        let result = await ZabbixCliDB.findById(args._id)
        result.items = await _.remove(result.items, item => {
            return item === args.child_id
        })
        await result.save()
        await HistoryGetController.updateWorkers(args._id)
        return await ItemsDB.findByIdAndRemove(args.child_id)
    },
/*
    createTriggersToItems: async (parent, {_id, input}) => { //TODO: добавить метод обновления
        let result = await ItemsDB.findById(_id)
        input.zabbixCliIDSchema = _id
        let newItems = await ItemsDB.create(input)
        await result.items.push(newItems._id)
        await result.save()
        HistoryGetController.updateWorkers(_id)
        return newItems
    },

    deleteTriggersToItems: async (parent, args) => {
        let result = await ZabbixCliDB.findById(args._id)
        result.items = await _.remove(result.items, item => {
            return item === args.child_id
        })
        await result.save()
        await HistoryGetController.updateWorkers(args._id)
        return await ItemsDB.findByIdAndRemove(args.child_id)
    },*/
}
