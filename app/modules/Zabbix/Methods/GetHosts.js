const MainMethod = require('./MainMethod')

class GetHosts extends MainMethod {
    constructor(url, token) {
        super(url, token)
        this.method = "host.get"
    }

    async get(params) {
        return this.hosts = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetHosts
