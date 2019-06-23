const MainMethod = require('./MainMethod')

class GetApp extends MainMethod {
    constructor(url, token) {
        super(url, token)
        this.method = "application.get"
    }

    async get(params) {
        return this.graph = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetApp