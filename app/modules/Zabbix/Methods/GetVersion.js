const Zabbix = require('./MainMethod')

class GetVersion extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this.method = "apiinfo.version"
    }

    async get(params = {}) {
        return this.version = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetVersion