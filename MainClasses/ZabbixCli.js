const {GetVersion, GetToken, GetHosts, GetHostGroup, GetItems, GetHistory, GetGraph} = require("./Methods/ExportsMethods")


class ZabbixCli {
    constructor(url, user, pass) {
        this.url = url
        this.user = user
        this.pass = pass
        this.token = null
        this.version = null
        this.hosts = null
        this.hostGroup = null
        this.items = null
        this.history = null
        this.graphs = null
    }

    async login() {
        this.token = await this.methods().getToken()
    }

    methods() {
        return {
            getVersion: async () => {
                let getV = await GetVersion(this.url, null, {})
                return await getV.getVersionZabbix
            },

            getToken: async () => {

                let params = {
                    user: this.user,
                    password: this.pass
                }

                let GT = await GetToken(this.url, null, params)
                return this.token = await GT.getTokenAuth

            },

            getHosts: async () => {
                    let params = {
                        output: ["hostid", "host"],
                        selectInterfaces: ["interfaceid", "ip"]
                    }

                    let GH = await GetHosts(this.url, this.token, params)
                    return this.hosts = await GH.getZabbixHostas

            },

            getHostGroup: async () => {

                let params = {
                    output: "extend"
                }
                if (this.hostGroup === null) {
                    let HGroup = await GetHostGroup(this.url, this.token, params)
                    return this.hostGroup = await HGroup.getZabbixHostGroup
                }
                return this.hostGroup
            },

            getItems: async (hostid) => {

                let params = {
                    output: ["hostid", "itemid", "name"],
                    graphid: 808,
                    hostids: 10084,
                    search: {"key_": "system"},
                    sortfield: "name"
                }

                if (this.items === null) {
                    let Item = await GetItems(this.url, this.token, params)
                    return this.items = await Item.getZabbixItems
                }
                return this.items
            },

            getHistory: async (itemid) => {

                let params = {
                    output: "extend",
                    itemids: itemid,
                    history: 0,
                    sortfield: "clock",
                    sortorder: "DESC",
                    limit: 10
                }

                if (this.history === null) {
                    let hist = await GetHistory(this.url, this.token, params)
                    return this.history = await hist.getZabbixHistory
                }
                return this.history
            },

            getGraphics: async () => {

                let params = {
                    output: ["graphid", "name"],
                    hostids: 10084,
                    sortfield: "name"
                }
                if (this.graphs === null) {
                    let GG = await GetGraph(this.url, this.token, params)
                    return this.graphs = await GG.getGraphZabbix
                }
                return this.graphs
            },

        }
    }


}


async function main() {
    let zabbix = await new ZabbixCli('http://192.168.0.103/zabbix/api_jsonrpc.php', 'Admin', 'zabbix')
    await zabbix.login()
    let test = await zabbix.methods().getToken()
    console.log(test)

   /* let test1 = await zabbix.methods().getItems()
    console.log(test1)
*/
}

main()