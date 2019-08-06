const _ = require('lodash')
const zabbixAPI = require('../../modules/zabbix/zabbixAPI')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')
const HistoryGetController = require('./../../modules/workers/factory')({typeObject: "HistoryGet"})

module.exports = {
    zabbixCliFindById: async (parent, args) => {
        try {
            return await ZabbixCli.findById(args._id).populate({
                path: 'items',
                model: 'Items',
                populate: {
                    path: 'triggers',
                    model: 'Triggers'
                }
            })
            //await res.populate('triggers')
        } catch (e) {
            throw new Error(e)
        }
    },
    zabbixCliFind: async (parent, args) => {
        try {
            return await ZabbixCli.find({}).populate({
                path: 'items',
                model: 'Items',
                populate: {
                    path: 'triggers',
                    model: 'Triggers'
                }
            })
        } catch (e) {
            throw new Error(e)
        }
    },
    getWorkers: () => {
        return HistoryGetController.getWorkers()
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

}