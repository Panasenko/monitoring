const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')

class GetT {
    constructor(url, token) {

        this.url = url
        this.token = token
        this.method = "user.login"
    }

    //Получение версии забикаса
    async call(params) {
        let sr = new SettingRequest().setParams(this.method, this.token, params)

        let newobj = new CallZabbixAPI(this.url, sr)
        let result = await newobj.call()
        this.token = result.data.result
    }

    getToken() {
        if (this.token !== null) {
            return this.token
        }
        throw new Error('Error getting token. Parameter token is undefined')
    }
}


async function GetToken(url, token, params) {
    let GT = await new GetT(url, token)
    await GT.call(params)
    return {
        getTokenAuth: await GT.getToken()
    }
}


module.exports = GetToken
