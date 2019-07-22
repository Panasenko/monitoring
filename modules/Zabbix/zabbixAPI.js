const Errors = require("./Errors")
const CallAPI = require("./CallAPI")

class ZabbixAPI {
    static async callAPI(url, token, method, params) {
        let new_Obj = new CallAPI(url)
        let result = await new_Obj.call(method, token, params)
        return await result.data.result
    }

    static async login(url, reqParam) {
        Errors.valid(reqParam, this.constructor.name, "login")
        return await this.callAPI(url, null, "user.login", reqParam)
    }

    static async getVersion(url) {
        return await this.callAPI(url, null, "apiinfo.version", {})
    }

    static async getHosts(url, token, reqParam) {
        let params = {
            output: ["hostid", "host"],
            selectInterfaces: ["interfaceid", "ip"]
        }
        Errors.valid(params, this.constructor.name, "getHosts")
        return await this.callAPI(url, token, "host.get", params)
    }

    static async getHostGroup(url, token, reqParam) {
        let params = {
            "output": ["groupid", "name"],
            "real_hosts": true,
            "selectHosts": ["hostid", "host", "name", "description", "status"]
        }
        Errors.valid(params, this.constructor.name, "getHostGroup")
        return await this.callAPI(url, token, "hostgroup.get", params)
    }

    static async getItems(url, token, reqParam) {
        let params = {
            output: "extend",
            hostids: reqParam.hostid,
            sortfield: "name",
            selectGraphs: ["graphid", "name"],
            selectApplications: ["applicationid", "hostid", "name"]
        }
        Errors.valid(params, this.constructor.name, "getItems")
        return await this.callAPI(url, token, "item.get", params)
    }

    static async getHistory(url, token, reqParam) {
        let params = {
            output: "extend",
            itemids: reqParam.itemids,
            time_from: reqParam.time_from || null,
            //time_till: reqParam.time_till || null, //TODO: что-то сделать с проверкой null
            history: 0,
            sortfield: "clock",
            sortorder: "DESC"
        }
        Errors.valid(params, this.constructor.name, "getHistory")
        return await this.callAPI(url, token, "history.get", params)
    }

    static async getGraphics(url, token, reqParam) {
        let params = {
            "output": ["graphid", "name"],
            "hostids": reqParam.hostid,
            "sortfield": "name",
            "selectItems": ["itemid", "hostid", "name", "key_", "lastclock", "lastns", "lastvalue", "prevvalue"],
            "selectHosts": "hostid"
        }

        Errors.valid(params, this.constructor.name, "getGraphics")
        return await this.callAPI(url, token, "graph.get", params)
    }

    static async getGraphItems(url, token, reqParam) {
        let params = {
            output: "extend",
            expandData: 1,
            graphids: reqParam.graphids
        }
        Errors.valid(params, this.constructor.name, "getGraphItems")
        return await this.callAPI(url, token, "graphitem.get", params)
    }

    static async getApplications(url, token, reqParam) {
        let params = {
            output: "extend",
            hostids: reqParam.hostid,
            selectItems: ["itemid", "hostid", "name", "key_", "lastclock", "lastns", "lastvalue", "prevvalue"]
        }
        Errors.valid(params, this.constructor.name, "getApplications")
        return await this.callAPI(url, token, "application.get", params)
    }
}

module.exports = ZabbixAPI
