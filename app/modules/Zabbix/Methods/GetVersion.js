const Zabbix = require('./MainMethod')

class GetVersion extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._version = null
        this.method = "apiinfo.version"
    }

    set token(value) {
        this._token = value
    }

    get token() {
        return this._token
    }

    set version(value) {
        this._version = value
    }

    get version() {
        return this._version
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async get(params = {}) {
        return this.version = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetVersion