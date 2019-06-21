const Zabbix = require('./Zabbix')

class GetTokens extends Zabbix {
    constructor(url) {
        super(url)
        this._token = null
        this.method = "user.login"
    }

    set token(value) {
        this._token = value
    }

    get token() {
        return this._token
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async call(params) {
       return this.token = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetTokens


async function main() {

    let newToken = await new GetTokens('http://192.168.0.103/zabbix/api_jsonrpc.php')

    let params = {
        user: "Admin",
        password: "zabbix"
    }

    await newToken.call(params)
    console.log(newToken.token)



}

main()
