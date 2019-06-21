const Zabbix = require('./MainMethod')

class GetHosts extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._host = null
        this.method = "host.get"
    }

    set token(value) {
        this._token = value
    }

    get token() {
        return this._token
    }

    set host(value) {
        this._host = value
    }

    get host() {
        return this._host
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async get(params) {
        this.host = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetHosts
