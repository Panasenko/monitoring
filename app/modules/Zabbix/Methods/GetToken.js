const Zabbix = require('./MainMethod')

class GetTokens extends Zabbix {
    constructor(url) {
        super(url)
        this._token = null
        this.method = "user.login"
    }

    set token(value) {
        this._token = value
    }

    get token() {
        return this._token
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async get(params) {
       return this.token = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetTokens
