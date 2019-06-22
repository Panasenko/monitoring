const Zabbix = require('./MainMethod')

class GetItems extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._item = null
        this.method = "item.get"
    }

    set token(value) {
        this._token = value
    }

    get token() {
        return this._token
    }

    set item(value) {
        this._item = value
    }

    get item() {
        return this._item
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async get(params) {
        this.item = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetItems
