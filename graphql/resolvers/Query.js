const _ = require('lodash')
const zabbixAPI = require('../../modules/zabbix/zabbixAPI')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')

const Controller = require('./../../modules/workers/controller')

module.exports = {
        zabbixCliFindById: async (parent, args) => {
            let con = new Controller
                con.addWorkers()

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
    }