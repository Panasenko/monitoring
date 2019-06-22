const Zabbix = require('./MainMethod')

class GetItems extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this.method = "item.get"
    }

    async get(params) {
        return this.items = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetItems
