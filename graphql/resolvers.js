const _ = require('lodash')
const zabbixAPI = require('../modules/Zabbix/zabbixAPI')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')
const Items = mongoose.model('Items')

module.exports = {
    Query: {
        zabbixCliFindById: async (_, args) => {
            return await ZabbixCli.findOne({_id: args._id}).populate('items')
        },
        token: async (_, args) => {
            let token = await zabbixAPI.login(args.url, args.input)
            return {
                token: token
            }
        },
        version: async (_, args) => {
            let vers = await zabbixAPI.getVersion(args.url, null, {})
            return {version: vers}
        },
        hostgroup: async (_, args) => {
            return await zabbixAPI.getHostGroup(args.url, args.token, args.reqParam)
        },
        hosts: async (_, args) => {
            return await zabbixAPI.getHosts(args.url, args.token, args.reqParam)
        },
        applications: async (_, args) => {
            return await zabbixAPI.getApplications(args.url, args.token, args.reqParam)
        },
        graphics: async (parent, args) => {
            return await zabbixAPI.getGraphics(args.url, args.token, args.reqParam)
        },
        items: async (parent, args) => {
            return await zabbixAPI.getItems(args.url, args.token, args.reqParam)
        }
    },
    Mutation: {
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
    },
    Hosts: {
        applications: async (parent, args) => {
            let Apps = await zabbixAPI.getApplications(args.url, args.token, parent)
            return _.filter(Apps, a => a.hostid === parent.hostid)
        },
        graphics: async (parent, args) => {
            let Apps = await zabbixAPI.getGraphics(args.url, args.token, parent)
            return _.filter(Apps, a => a.hosts[0].hostid === parent.hostid)
        },
        items: async (parent, args) => {
            let Apps = await zabbixAPI.getItems(args.url, args.token, parent)
            return _.filter(Apps, a => a.hostid === parent.hostid)
        }
    }
}
