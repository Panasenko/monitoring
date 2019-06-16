const CallZabbixAPI = require('../MainClasses/CallZabbixAPI')

class GetVersion {
    constructor (url) {

        this.url = url
        this.version = ''
        this.requestBody = {}

    }

    builderRequestBody(params, token){

        this.requestBody.jsonrpc = 2.0
        this.requestBody.method = "apiinfo.version"
        this.requestBody.id = 1
        this.requestBody.auth = ( token !== undefined ) ? token : null
        this.requestBody.params = ( params !== undefined ) ? params : {}

        return this.requestBody
    }

    //Получение версии забикаса
    async zabbixVersion() {
        let newobj = new CallZabbixAPI(this.url, this.builderRequestBody())
        let result = await newobj.call()
        return this.version = result.data.result
    }

    getZabbixVersion() {
        if(this.version === undefined){
            throw new Error('Error getting version. Parameter version is undefined')
        }
        return this.version
    }

    getRequestBody () {
        return this.requestBody
    }
}

module.exports =  GetVersion