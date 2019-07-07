const Errors = require("./Errors")
const MainMethod = require('./MainMethod')

class ZabbixAPI extends MainMethod {
    constructor(args) {
        super(args)
        Errors.valid(args, this.constructor.name, "Constructor")
    }

    async call(method, params) {
        return await super.callAPI(this.url, this.token, method, params)
    }

    //Блок авторизации
    async login(params) {
        Errors.valid(params, this.constructor.name, "login")
        return this.token = await this.call("user.login", params)
    }

    //Блок работы с методом получения версии АПИ Zabbix
    async getVersion(args) {
        return this.version = await this.call("apiinfo.version", args)
    }

    //Блок получения доступных хостов
    async getHosts(args) {
        let params = {
            output: ["hostid", "host"],
            selectInterfaces: ["interfaceid", "ip"]
        }

        Errors.valid(params, this.constructor.name, "getHosts")
        return this.hosts = await this.call("host.get", params)
    }

    //Блок получения доступных хостов групп
    async getHostGroup(args) {
        let params = {
            "output": ["groupid", "name"],
            "real_hosts": true,
            "selectHosts": ["hostid", "host", "name", "description", "status"]
        }
        Errors.valid(params, this.constructor.name, "getHostGroup")
        return this.hostGroup = await this.call("hostgroup.get", params)

    }

    //Блок получения доступных хостов групп
    async getItems(args) {
        let params = {
            output: ["itemid", "hostid", "name", "key_","lastclock","lastns","lastvalue","prevvalue"],
            hostids: args.hostid,
            sortfield: "name",
            selectGraphs: ["graphid","name"],
            selectApplications: ["applicationid", "hostid","name"]
        }
        Errors.valid(params, this.constructor.name, "getItems")
        return this.items = await this.call("item.get", params)
    }

    //Блок получения истории по элементам данных
    async getHistory(args) {
        let params = {
            output: "extend",
            itemids: 23296,
            history: 0,
            sortfield: "clock",
            sortorder: "DESC",
            limit: 10
        }

        Errors.valid(params, this.constructor.name, "getHistory")
        return this.history = await this.call("history.get", params)

    }

    //Блок получения доступных графиков
    async getGraphics(args) {
        let params = {
            "output": ["graphid", "name"],
            "hostids": args.hostid,
            "sortfield": "name",
            "selectItems": ["itemid","hostid","name","key_","lastclock","lastns","lastvalue","prevvalue"],
            "selectHosts": "hostid"
        }

        Errors.valid(params, this.constructor.name, "getGraphics")
        return this.graphs = await this.call("graph.get", params)

    }

    //Блок получения доступных элементов графиков
    async getGraphItems(args) {
        let params = {
            output: "extend",
            expandData: 1,
            graphids: args.graphids
        }

        Errors.valid(params, this.constructor.name, "getGraphItems")
        return this.graphitem = await this.call("graphitem.get", params)

    }

    //Блок получения доступных приложений
    async getApplications(args) {
        let params = {
            output: "extend",
            hostids: args.hostid,
            selectItems: ["itemid", "hostid", "name", "key_", "lastclock", "lastns", "lastvalue", "prevvalue"]
        }
        Errors.valid(params, this.constructor.name, "getApplications")
        return this.application = await this.call("application.get", params)

    }

}

module.exports = ZabbixAPI
