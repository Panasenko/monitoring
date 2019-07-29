const _ = require('lodash')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')
const Items = mongoose.model('Items')

module.exports = {
    createZabbixCli: async (_, {input}) => {
        try {
            return await ZabbixCli.create(input)
        } catch (error) {
            return error
        }
    },
    updateZabbixCli: async (_, {_id, input}) => {
        try {
            return await ZabbixCli.findByIdAndUpdate(_id, input, {new: true})
        } catch (e) {
            return e
        }
    },
    deleteZabbixCli: async (_, args) => {
        try {
            let elementDelete = ZabbixCli.findByIdAndRemove(args._id)
            Items.deleteMany({ zabbixCliID: args._id }, function (err) {
                if(err){
                    throw new Error(err)
                }
            })

            return elementDelete
        } catch (e) {
            return e
        }
    },
    createItemsToZabbixCli: async (parent, {_id, input}) => {
        try{
            let result = await ZabbixCli.findById(_id)
            input.zabbixCliID = _id
            let newItems = await Items.create(input)
            await result.items.push(newItems._id)
            await result.save()
            return newItems
        } catch (e) {
            return e
        }
    },
    updateItemsToZabbixCli: async (parent, {_id, input}) => { //TODO: протестировать
        try {
            return await Input.findByIdAndUpdate(_id, input, {new: true})
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
            return Items.findByIdAndRemove(args.child_id)
        } catch (e) {
            return e
        }
    },
}
