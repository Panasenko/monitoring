const Zabbix = require('./Zabbix')

class GetHosts extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._host = null
        this.method = "host.get"
    }

    set token(value) {
        this._token = value
    }

    get token() {
        return this._token
    }

    set host(value) {
        this._host = value
    }

    get host() {
        return this._host
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async call(params) {
        this.host = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetHosts

/*

async function main() {

    let newToken = await new GetHosts('http://192.168.0.103/zabbix/api_jsonrpc.php', "3248abc7d381a0d3b0210012ac607638")

    let params = {
        output: ["hostid", "host"],
        selectInterfaces: ["interfaceid", "ip"]
    }


    await newToken.call(params)
    console.log(newToken.host)



}

main()

*/
