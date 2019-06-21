const Zabbix = require('./Zabbix')

class GetHistory extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._history = null
        this.method = "history.get"
    }

    set token(value) {
        this._token = value
    }
    get token() {
        return this._token
    }
    set history(value) {
        this._history = value
    }
    get history() {
        return this._history
    }

    get url() {
        return this._url
    }
    set url(value) {
        this._url = value
    }
    async call(params) {
        this.history = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetHistory

/*

async function main() {

    let newToken = await new GetHistory('http://192.168.0.103/zabbix/api_jsonrpc.php', "3248abc7d381a0d3b0210012ac607638")

    let params = {
        output: "extend",
        itemids: "23625",
        history: 0,
        sortfield: "clock",
        sortorder: "DESC",
        limit: 10
    }

    await newToken.call(params)
    console.log(newToken.history)



}

main()
*/
