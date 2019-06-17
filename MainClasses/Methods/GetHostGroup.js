const CallZabbixAPI = require('../CallZabbixAPI')

class HostsG {
    constructor ( url, token) {

        this.url = url
        this.token = token
        this.method = "hostgroup.get"
        this.hostGroup = null
        this.requestBody = {}
    }

    builderRequestBody( token ){
        let data = {}
        data.output = "extend"

        this.requestBody.jsonrpc = 2.0
        this.requestBody.method = this.method
        this.requestBody.id = 1
        this.requestBody.auth = ( token !== undefined ) ? token : null
        this.requestBody.params = data //TODO Написать динамическое изменение параметров для передачи настроек выборки

        return this.requestBody
    }

    //Получение всех хостов
    async call() {
        let newobj = new CallZabbixAPI(this.url, this.builderRequestBody( this.token )) //TODO переработкать проверку переданного токена
        let result = await newobj.call() //TODO сделать проверку возврата функции
        this.hostGroup = result.data.result
    }

    getHostGroup() {
        if(this.hostGroup.length > 0) {
            return this.hostGroup
        }
        throw new Error('HostGroup are not found')
    }
}

async function HostsGroup(url, token){
    let hostsGroup = await new HostsG(url, token)
    await hostsGroup.call()
    return {
        getZabbixHostGroup: await hostsGroup.getHostGroup()
    }
}


module.exports = HostsGroup