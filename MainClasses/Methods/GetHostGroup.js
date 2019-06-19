const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')

class HostsG {
    constructor(url, token) {
        this.url = url
        this.token = token
        this.method = "hostgroup.get"
        this.hostGroup = null
    }

    //Получение всех хостов
    async call(params) {
        let sr = new SettingRequest().setParams(this.method, this.token, params)

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
    let hostsGroup = await new HostsG(url, token)
    await hostsGroup.call(params)
    return {
        getZabbixHostGroup: await hostsGroup.getHostGroup()
    }
}


module.exports = HostsGroup