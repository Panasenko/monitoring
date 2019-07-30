const _ = require('lodash')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')
const Items = mongoose.model('Items')

const Controller = require('./../../modules/workers/controller')

module.exports = {
    createZabbixCli: async (parent, {input}) => {
        try {
            let data = await ZabbixCli.create(input)
            await Controller.createWorkers(data)
            return await data
        } catch (error) {
            return error
        }
    },
    updateZabbixCli: async (parent, {_id, input}) => {
        try {
             let updateZabbixCli = await ZabbixCli.findByIdAndUpdate(_id, input, {new: true})
            await Controller.updateWorkers(_id)
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
            await Controller.deleteWorkers(_id)
            return await elementDelete
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

            Controller.updateWorkers(_id)

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
            await Controller.updateWorkers(args._id)
            return await Items.findByIdAndRemove(args.child_id)
        } catch (e) {
            return e
        }
    },
}
