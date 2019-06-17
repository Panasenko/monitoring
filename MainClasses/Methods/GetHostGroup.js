const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')

class HostsG {
    constructor(url, token, params) {

        this.url = url
        this.token = token
        this.method = "hostgroup.get"
        this.hostGroup = null
        this.params = params
    }

    //Получение всех хостов
    async call() {
        let sr = new SettingRequest().setParams(this.method, this.token, this.params)

        let newobj = new CallZabbixAPI(this.url, sr)
        let result = await newobj.call() //TODO сделать проверку возврата функции
        this.hostGroup = result.data.result
    }

    getHostGroup() {
        if (this.hostGroup.length > 0) {
            return this.hostGroup
        }
        throw new Error('HostGroup are not found')
    }
}

async function HostsGroup(url, token, params) {
    let hostsGroup = await new HostsG(url, token, params)
    await hostsGroup.call()
    return {
        getZabbixHostGroup: await hostsGroup.getHostGroup()
    }
}


module.exports = HostsGroup