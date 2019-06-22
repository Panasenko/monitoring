const Zabbix = require('./MainMethod')

class HostsGroup extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._hostgroup = null
        this.method = "hostgroup.get"
    }

    set token(value) {
        this._token = value
    }

    get token() {
        return this._token
    }

    set hostgroup(value) {
        this._hostgroup = value
    }

    get hostgroup() {
        return this._hostgroup
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async get(params) {
        this.hostgroup = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = HostsGroup
