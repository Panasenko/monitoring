const CallZabbixAPI = require('../CallZabbixAPI')

class Hosts {
    constructor ( url, token) {

        this.url = url
        this.token = token
        this.hosts = null
        this.requestBody = {}
    }

    builderRequestBody( token ){
        let data = {}
        data.output = ["hostid", "host"]
        data.selectInterfaces = ["interfaceid", "ip"]

        this.requestBody.jsonrpc = 2.0
        this.requestBody.method = "host.get"
        this.requestBody.id = 1
        this.requestBody.auth = ( token !== undefined ) ? token : null
        this.requestBody.params = data

        return this.requestBody
    }

    //Получение всех хостов
    async call() {
        let newobj = new CallZabbixAPI(this.url, this.builderRequestBody(this.token))
        let result = await newobj.call()
        this.hosts = result.data.result
    }

    getHosts() {
        if(this.hosts.length > 0) {
            return this.hosts
        }
        throw new Error('Hosts are not found')
    }
}

module.exports = Hosts