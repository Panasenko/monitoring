const CallAPI = require("../Service/CallAPI")

class Zabbix {
    constructor(url, token) {
        this._url = url
        this._token = token
    }

    get token() {
        return this._token
    }

    set token(value) {
        this._token = value
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async callAPI(url, method, token, params) {
        let new_Obj = new CallAPI(url)
        let result = await new_Obj.call(url, method, token, params)
        return await result.data.result
    }

}

module.exports = Zabbix
