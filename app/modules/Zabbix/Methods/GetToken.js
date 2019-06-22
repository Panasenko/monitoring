const MainMethod = require('./MainMethod')

class GetTokens extends MainMethod {
    constructor(url) {
        super(url)
        this.method = "user.login"
    }

    async get(params) {
       return this.token = await super.callAPI(this.url, this.method, null , params)
    }

}

module.exports = GetTokens
