const Zabbix = require('./MainMethod')

class GetGraph extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._graph = null
        this.method = "graph.get"
    }

    set token(value) {
        this._token = value
    }
    get token() {
        return this._token
    }
    set graph(value) {
        this._graph = value
    }
    get graph() {
        return this._graph
    }

    get url() {
        return this._url
    }
    set url(value) {
        this._url = value
    }
    async get(params) {
        return this.graph = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetGraph