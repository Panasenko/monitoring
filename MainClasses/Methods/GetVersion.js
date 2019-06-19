const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')


class GetVe {
    constructor(url, token) {

        this.url = url
        this.version = null
        this.token = token
        this.method = "apiinfo.version"

    }

    //Получение версии забикаса
    async call( params ) {

        let SettingReq = new SettingRequest().setParams(this.method, this.token, params)

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

}

async function GetVersion(url, token, params) {
    let getV = await new GetVe(url, token)
    await getV.call(params)
    return {
        getVersionZabbix: await getV.getZabbixVersion()
    }
}


module.exports = GetVersion