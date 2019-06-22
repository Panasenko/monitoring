const MainMethod = require('./MainMethod')

class HostsGroup extends MainMethod {
    constructor(url, token) {
        super(url, token)
        this.method = "hostgroup.get"
    }

    async get(params) {
       return this.hostGroup = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = HostsGroup
