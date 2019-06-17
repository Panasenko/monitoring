const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')

class GetT {
    constructor(url, token, params) {

        this.url = url
        this.token = token
        this.method = "user.login"
        this.params = params
    }

    //Получение версии забикаса
    async login() {
        let sr = new SettingRequest().setParams(this.method, this.token, this.params)

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
    let GT = await new GetT(url, token, params)
    await GT.login()
    return {
        getTokenAuth: await GT.getToken()
    }
}


module.exports = GetToken
