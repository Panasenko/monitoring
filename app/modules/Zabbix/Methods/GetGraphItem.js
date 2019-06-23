const MainMethod = require('./MainMethod')

class GetGraphItem extends MainMethod {
    constructor(url, token) {
        super(url, token)
        this.method = "graphitem.get"
    }

    async get(params) {
        return this.graph = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetGraphItem