const Zabbix = require('./Zabbix')

class GetItems extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._item = null
        this.method = "item.get"
    }

    set token(value) {
        this._token = value
    }

    get token() {
        return this._token
    }

    set item(value) {
        this._item = value
    }

    get item() {
        return this._item
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async call(params) {
        this.item = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetItems

/*

async function main() {

    let newToken = await new GetItems('http://192.168.0.103/zabbix/api_jsonrpc.php', "3248abc7d381a0d3b0210012ac607638")

    let params = {
        output: ["hostid", "itemid", "name"],
        graphid: 808,
        hostids: 10084,
        search: {"key_": "system"},
        sortfield: "name"
    }


    await newToken.call(params)
    console.log(newToken.item)



}

main()

*/
