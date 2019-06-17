const {GetVersion, GetToken, GetHosts, GetHostGroup, GetItems, GetHistory} = require("./Methods/AllMethods")


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
                    output: "extend",
                    hostids: hostid,
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

        }
    }


}


async function main() {
    let zabbix = await new ZabbixCli('http://192.168.0.101/zabbix/api_jsonrpc.php', 'Admin', 'zabbix')
    await zabbix.login()


    let test = await zabbix.methods().getItems(10084)
    console.log(test)


}

main()