const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')

class Graph {
    constructor(url, token, params) {

        this.url = url
        this.token = token
        this.method = "graph.get"
        this.graph = null
        this.params = params
    }

    //Получение всех хостов
    async call( ) {
        let SettingReq = new SettingRequest().setParams(this.method, this.token, this.params)

        let newobj = new CallZabbixAPI(this.url, SettingReq)
        let result = await newobj.call()
        this.graph = result.data.result
    }

    getZabbixg() {
        if (this.graph === null || this.graph === undefined) {
            throw new Error('Error getting version. Parameter version is undefined')
        }
        return this.graph
    }

}

async function GetGraph(url, token, params) {
    let getV = await new Graph(url, token, params)
    await getV.call()
    return {
        getGraphZabbix: await getV.getZabbixg()
    }
}


module.exports = GetGraph