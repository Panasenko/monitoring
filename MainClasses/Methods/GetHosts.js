const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')

class Hosts {
    constructor(url, token) {

        this.url = url
        this.token = token
        this.hosts = null
        this.method = "host.get"
     }

    //Получение всех хостов
    async call(params) {
        let sr = new SettingRequest().setParams(this.method, this.token, params)

        let newobj = new CallZabbixAPI(this.url, sr)
        let result = await newobj.call()
        this.hosts = result.data.result
    }

    getHosts() {
        if (this.hosts.length > 0) {
            return this.hosts
        }
        throw new Error('Hosts are not found')
    }
}

async function GetHosts(url, token, params) {
    let hosts = await new Hosts(url, token)
    await hosts.call(params)
    return {
        getZabbixHostas: await hosts.getHosts()
    }
}


module.exports = GetHosts