const {MeainMethod, GetVersion, GetToken, GetHosts, GetHostGroup, GetItems, GetHistory, GetGraph, GetApp, GetGraphItem} = require("./Service/ExportsClass")
const Errors = require("./Service/Errors")

class ZabbixAPI extends MeainMethod {
    constructor(url) {
        super(url)
        Errors.valid({url}, this.constructor.name, "Constructor")
    }


    //Блок авторизации
    async login(params) {
        Errors.valid(params, this.constructor.name, "login")
        let gv = await new GetToken(this.url, null)
        return this.token = await gv.get(params)
    }

    //Блок работы с методом получения версии АПИ Zabbix
    async getVersion() {
        let gv = await new GetVersion(this.url, null)
        return this.version = await gv.get({})
    }

    //Блок получения доступных хостов
    async getHosts() {
        let params = {
            output: ["hostid", "host"],
            selectInterfaces: ["interfaceid", "ip"]
        }

        Errors.valid(params, this.constructor.name, "getHosts")

        let GH = await new GetHosts(this.url, this.token)
        return this.hosts = await GH.get(params)
    }

    //Блок получения доступных хостов групп
    async getHostGroup() {
        let params = {
            output: "extend"
        }
        Errors.valid(params, this.constructor.name, "getHostGroup")
        let GHG = await new GetHostGroup(this.url, this.token, params)
        return this.hostGroup = await GHG.get(params)
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
        let GI = await new GetItems(this.url, this.token, params)
        return this.items = await GI.get(params)
    }

    //Блок получения истории по элементам данных
    async getHistory() {
        let params = {
            output: "extend",
            itemids: 23296,
            history: 0,
            sortfield: "clock",
            sortorder: "DESC",
            limit: 10
        }

        Errors.valid(params, this.constructor.name, "getHistory")
        let GH = await new GetHistory(this.url, this.token, params)
        return this.history = await GH.get(params)
    }

    //Блок получения доступных графиков
    async getGraphics() {
        let params = {
            output: ["graphid", "name"],
            hostids: 10084,
            sortfield: "name"
        }

        Errors.valid(params, this.constructor.name, "getGraphics")
        let GG = await new GetGraph(this.url, this.token, params)
        return this.graphs = await GG.get(params)
    }

    //Блок получения доступных элементов графиков
    async getGraphItems() {
        let params = {
            output: "extend",
            expandData: 1,
            graphids: "528"
        }

        Errors.valid(params, this.constructor.name, "getGraphItems")
        let GGI = await new GetGraphItem(this.url, this.token, params)
        return this.graphitem = await GGI.get(params)
    }

    //Блок получения доступных приложений
    async getApplications() {
        let params = {
            output: "extend",
            sortfield: "name",
            groupids: 4
        }

        Errors.valid(params, this.constructor.name, "getApplications")
        let GA = await new GetApp(this.url, this.token, params)
        return this.application = await GA.get(params)
    }

}

module.exports = async (url, params, token) => {
    let z = await new ZabbixAPI(url)
    return {
        auth: await z.login(params),
        getVersion: await z.getVersion()
    }
}

