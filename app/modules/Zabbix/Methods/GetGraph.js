const MainMethod = require('./MainMethod')

class GetGraph extends MainMethod {
    constructor(url, token) {
        super(url, token)
        this.method = "graph.get"
    }

    async get(params) {
        return this.graph = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetGraph