const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')

class Graph {
    constructor(url, token) {

        this.url = url
        this.token = token
        this.method = "graph.get"
        this.graph = null
    }

    //Получение всех хостов
    async call( params ) {
        let SettingReq = new SettingRequest().setParams(this.method, this.token, params)

        let newobj = new CallZabbixAPI(this.url, SettingReq)
        let result = await newobj.call()
        return this.graph = result.data.result
    }

    getZabbixg() {
        if (this.graph === null || this.graph === undefined) {
            throw new Error('Error getting version. Parameter version is undefined')
        }
        return this.graph
    }

}

async function GetGraph(url, token, params) {
    let getV = await new Graph(url, token)
    await getV.call(params)
    return {
        getGraphZabbix: await getV.getZabbixg()
    }
}


module.exports = GetGraph