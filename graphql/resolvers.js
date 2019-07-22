const _ = require('lodash')
const zabbixAPI = require('../modules/Zabbix/zabbixAPI')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')

module.exports = {
    Query: {
        zabbixCliFindById: async (_, args) => {
            return ZabbixCli.findById(args._id)
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
                return ZabbixCli.findByIdAndRemove(args._id)
            } catch (e) {
                return e
            }
        },
        createSubdocItemsZabbixCli: async (parent, {_id, input}) => { //TODO выяснить какого Х добавляются одинаковые элементы без проверки уникальности. Добавить доп проверки
            try {
                let result = await ZabbixCli.findById(_id)
                let items = await result.items

                if(_.some(items, input)){
                    throw new Error("This value already exists in the database.")
                }

                await result.items.push(input)
                let subdoc = await result.items[result.items.length - 1]
                await result.save()
                return subdoc
            } catch (e) {
                return e
            }
        },
        deleteSubdocItemsZabbixCli: async (_, args) => {
            try {
                let result = await ZabbixCli.findById(args._id)
                let removedItem = await result.items.id(args.child_id).remove()
                await result.save()
                return await removedItem
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
