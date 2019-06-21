const Zabbix = require('./Zabbix')

class GetVersion extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._version = null
        this.method = "apiinfo.version"
    }

    set token(value) {
        this._token = value
    }

    get token() {
        return this._token
    }

    set version(value) {
        this._version = value
    }

    get version() {
        return this._version
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async call(params) {
        this.version = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetVersion


async function main() {

    let newToken = await new GetVersion('http://192.168.0.103/zabbix/api_jsonrpc.php', null)

    let params = {}

    await newToken.call(params)
    console.log(newToken.version)


}

main()

