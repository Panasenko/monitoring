const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')


class GetVe {
    constructor(url, token, params) {

        this.url = url
        this.version = null
        this.token = token
        this.params = params
        this.method = "apiinfo.version"

    }

    //Получение версии забикаса
    async call( ) {

        let SettingReq = new SettingRequest().setParams(this.method, this.token, this.params)

        let newobj = new CallZabbixAPI(this.url, SettingReq)
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

async function GetVersion(url, token, params) {
    let getV = await new GetVe(url, token, params)
    await getV.call()
    return {
        getVersionZabbix: await getV.getZabbixVersion(),
        getRequestBody: await getV.getZabbixRequestBody()
    }
}


module.exports = GetVersion