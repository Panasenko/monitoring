const _ = require('lodash')
const zabbixAPI = require('../../modules/zabbix/zabbixAPI')

module.exports = {
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