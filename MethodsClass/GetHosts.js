const CallZabbixAPI = require('../MainClasses/CallZabbixAPI')

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
    async RequestHosts() {
        let newobj = new CallZabbixAPI(this.url, this.builderRequestBody(this.token))
        let result = await newobj.call()
        return this.hosts = result.data.result
    }

    getHosts() {
        if(this.hosts.length > 0) {
            return this.hosts
        }
        throw new Error('Hosts are not found')
    }
}

module.exports = Hosts
/*


async function main () {
    const api = new Hosts('http://192.168.0.103/zabbix/api_jsonrpc.php', '946d902bba58f6d63183fc0d444481b2')
    let result = await api.RequestHosts()
   //console.log(result)
    console.log(    api.getHosts()    )
}

main()
*/
