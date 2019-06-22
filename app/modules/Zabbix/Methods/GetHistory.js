const MainMethod = require('./MainMethod')

class GetHistory extends MainMethod {
    constructor(url, token) {
        super(url, token)
        this.method = "history.get"
    }

    async get(params) {
        return this.history = await super.callAPI(this.url, this.method, this.token, params)
    }
}

module.exports = GetHistory
