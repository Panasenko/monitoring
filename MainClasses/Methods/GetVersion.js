const CallZabbixAPI = require('../CallZabbixAPI')

class GetVe {
    constructor(url) {

        this.url = url
        this.version = null
        this.method = "apiinfo.version"
        this.requestBody = {}

    }

    builderRequestBody(params, token) {

        this.requestBody.jsonrpc = 2.0
        this.requestBody.method = this.method
        this.requestBody.id = 1
        this.requestBody.auth = (token !== undefined) ? token : null
        this.requestBody.params = (params !== undefined) ? params : {}

        return this.requestBody
    }

    //Получение версии забикаса
    async call() {
        let newobj = new CallZabbixAPI(this.url, this.builderRequestBody())
        let result = await newobj.call()
        this.version = result.data.result
    }

    getZabbixVersion() {
        if (this.version === null || this.version === undefined) {
            throw new Error('Error getting version. Parameter version is undefined')
        }
        return this.version
    }

    getZabbixRequestBody() {
        return this.requestBody
    }
}

async function GetVersion(url) {
    let getV = await new GetVe(url)
    await getV.call()
    return {
        getVersionZabbix: await getV.getZabbixVersion(),
        getRequestBody: await getV.getZabbixRequestBody()
    }
}


module.exports = GetVersion