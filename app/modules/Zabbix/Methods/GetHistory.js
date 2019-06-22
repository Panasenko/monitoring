const Zabbix = require('./MainMethod')

class GetHistory extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._history = null
        this.method = "history.get"
    }

    set token(value) {
        this._token = value
    }
    get token() {
        return this._token
    }
    set history(value) {
        this._history = value
    }
    get history() {
        return this._history
    }

    get url() {
        return this._url
    }
    set url(value) {
        this._url = value
    }
    async get(params) {
        this.history = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetHistory
