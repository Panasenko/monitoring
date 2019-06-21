const {GetVersion, GetToken, GetHosts} = require("./Service/ExportsClass")

class ZabbixAPI {
    constructor(url, user, pass) {
        this._url = url
        this._user = user
        this._pass = pass
        this._token = null
        this._version = null
        this._hosts = null
        this._hostGroup = null
        this._items = null
        this._history = null
        this._graphs = null
    }

    get token() {
        return this._token
    }
    set token(value) {
        this._token = value
    }
    get version() {
        if(this._version === null){
            throw new Error("version is not create")
        }
        return this._version
    }
    set version(value) {
        this._version = value
    }

    async login() {
        let params = { //TODO сделать проверку передаваемых параметров
            user: this._user,
            password: this._pass
        }
        let gv = await new GetToken(this._url, null)
        this.token = await gv.get(params)
    }

    async getVersion(params){
        let gv = await new GetVersion(this._url, null)
        return this._version = await gv.get({})
    }


    async getHosts(params = paras){
        let paras = {
            output: ["hostid", "host"],
            selectInterfaces: ["interfaceid", "ip"]
        }

        if(this._url === undefined || this._url === null){
            throw new Error("Function getHosts is undefined or null")
        }

        let GH = await GetHosts(this.url, this.token)
        return this.hosts = await GH.getZabbixHostas

    }


}


async function main() {
    let z = await new ZabbixAPI('http://192.168.0.103/zabbix/api_jsonrpc.php', 'Admin', 'zabbix')
    let test = await z.login()
   console.log(await z.getVersion({}))

}

main()