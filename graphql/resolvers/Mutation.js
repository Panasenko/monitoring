const _ = require('lodash')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')
const Items = mongoose.model('Items')

const Controller = require('./../../modules/workers/controller')

module.exports = {
    createZabbixCli: async (_, {input}) => {
        try {
            let newZabbixCli = await ZabbixCli.create(input)
            Controller.createWorkers(newZabbixCli)
            return newZabbixCli
        } catch (error) {
            return error
        }
    },
    updateZabbixCli: async (_, {_id, input}) => {
        try {
             let updateZabbixCli = await ZabbixCli.findByIdAndUpdate(_id, input, {new: true})
            Controller.changWorkers(_id, updateZabbixCli)
            return updateZabbixCli
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

            Controller.deleteWorkers(args._id)

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

            Controller.updateWorkers()

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

            Controller.updateWorkers()

            return Items.findByIdAndRemove(args.child_id)
        } catch (e) {
            return e
        }
    },
}
