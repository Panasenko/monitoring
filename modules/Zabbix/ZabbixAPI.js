const Errors = require("./Errors")
const MainMethod = require('./MainMethod')

class ZabbixAPI extends MainMethod{
    constructor(url, token) {
        super(url, token)
        Errors.valid({url}, this.constructor.name, "Constructor")
    }

    async call(method, params){
        return await super.callAPI(this.url, this.token, method, params)
    }

    //Блок авторизации
    async login(params) {
        Errors.valid(params, this.constructor.name, "login")
        return this.token = await this.call("user.login", params)
    }

    //Блок работы с методом получения версии АПИ Zabbix
    async getVersion(params) {
        return this.version = await this.call("apiinfo.version", params)
    }
    //Блок получения доступных хостов
    async getHosts(params) {
        params = {
            output: ["hostid", "host"],
            selectInterfaces: ["interfaceid", "ip"]
        }

        Errors.valid(params, this.constructor.name, "getHosts")
        return this.hosts = await this.call("host.get", params)
    }

    //Блок получения доступных хостов групп
    async getHostGroup(params) {
        params = {
            output: "extend"
        }
        Errors.valid(params, this.constructor.name, "getHostGroup")
        return this.hostGroup = await this.call("hostgroup.get", params)

    }

    //Блок получения доступных хостов групп
    async getItems() {
        let params = {
            output: ["hostid", "itemid", "name"],
            graphid: 808,
            hostids: 10084,
            search: {"key_": "system"},
            sortfield: "name"
        }
        Errors.valid(params, this.constructor.name, "getItems")
        return this.items = await this.call("item.get", params)
    }

    //Блок получения истории по элементам данных
    async getHistory(params) {
        params = {
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
    async getGraphics(params) {
        params = {
            output: ["graphid", "name"],
            hostids: 10084,
            sortfield: "name"
        }

        Errors.valid(params, this.constructor.name, "getGraphics")
        return this.graphs = await this.call("graph.get", params)

    }

    //Блок получения доступных элементов графиков
    async getGraphItems(params) {
        params = {
            output: "extend",
            expandData: 1,
            graphids: "528"
        }

        Errors.valid(params, this.constructor.name, "getGraphItems")
        return this.graphitem = await this.call("graphitem.get", params)

    }

    //Блок получения доступных приложений
    async getApplications(args) {
        let params = {
            output: ["applicationid","hostid","name"],
            hostids: args.hostids
        }
        Errors.valid(params, this.constructor.name, "getApplications")
        return this.application = await this.call("application.get", params)

    }

}

module.exports = ZabbixAPI
