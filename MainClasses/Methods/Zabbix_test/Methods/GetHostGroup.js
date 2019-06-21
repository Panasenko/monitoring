const Zabbix = require('./Zabbix')

class HostsGroup extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._hostgroup = null
        this.method = "hostgroup.get"
    }

    set token(value) {
        this._token = value
    }

    get token() {
        return this._token
    }

    set hostgroup(value) {
        this._hostgroup = value
    }

    get hostgroup() {
        return this._hostgroup
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async call(params) {
        this.hostgroup = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = HostsGroup


async function main() {

    let newToken = await new HostsGroup('http://192.168.0.103/zabbix/api_jsonrpc.php', "3248abc7d381a0d3b0210012ac607638")

    let params = {
        output: "extend"
    }

    await newToken.call(params)
    console.log(newToken.hostgroup)



}

main()

