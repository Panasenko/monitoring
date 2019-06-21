const Zabbix = require('./Zabbix')

class GetGraph extends Zabbix {
    constructor(url, token) {
        super(url, token)
        this._graph = null
        this.method = "graph.get"
    }

    set token(value) {
        this._token = value
    }
    get token() {
        return this._token
    }
    set graph(value) {
        this._graph = value
    }
    get graph() {
        return this._graph
    }

    get url() {
        return this._url
    }
    set url(value) {
        this._url = value
    }
    async call(params) {
        this.graph = await super.callAPI(this.url, this.method, this.token, params)
    }

}

module.exports = GetGraph
/*


async function main() {

    let newToken = await new GetGraph('http://192.168.0.103/zabbix/api_jsonrpc.php', "3248abc7d381a0d3b0210012ac607638")

    let params = {
        output: ["graphid", "name"],
        hostids: 10084,
        sortfield: "name"
    }

    await newToken.call(params)
    console.log(newToken.graph)



}

main()
*/
