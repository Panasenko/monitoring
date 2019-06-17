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
        let GT = await GetToken(this.url, this.user, this.pass)
        this.token = await GT.getTokenAuth
    }

    methods() {
        return {
            getVersion: async () => {
                let getV = await GetVersion(this.url)
                return await getV.getVersionZabbix
            },

            getToken: async () => {
                if (this.token === null) {
                    let GT = await GetToken(this.url, this.user, this.pass)
                    return this.token = await GT.getTokenAuth
                }
                return this.token
            },

            updateToken: async () => {
                let GT = await GetToken(this.url, this.user, this.pass)
                return this.token = await GT.getTokenAuth
            },

            getHosts: async () => {
                if (this.hosts === null) {
                    let GH = await GetHosts(this.url, this.token)
                    return this.hosts = await GH.getZabbixHostas
                }
                return this.hosts
            },

            updateHosts: async () => {
                let GH = await GetHosts(this.url, this.token)
                return this.hosts = await GH.getZabbixHostas
            },

            getHostGroup: async () => {
                if (this.hostGroup === null) {
                    let HGroup = await GetHostGroup(this.url, this.token)
                    return this.hostGroup = await HGroup.getZabbixHostGroup
                }
                return this.hostGroup
            },

            getItems: async (hostid) => {
                if (this.items === null) {
                    let Item = await GetItems(this.url, this.token, hostid)
                    return this.items = await Item.getZabbixItems
                }
                return this.items
            },

            getHistory: async (items) => {
                if (this.history === null) {
                    let hist = await GetHistory(this.url, this.token, items)
                    return this.history = await hist.getZabbixHistory
                }
                return this.history
            },

        }
    }


}


async function main() {
    let zabbix = await new ZabbixCli('http://192.168.0.103/zabbix/api_jsonrpc.php', 'Admin', 'zabbix')
    await zabbix.login()
    let test = await zabbix.methods().getVersion()
/*    console.log(test)
    let test1 = await zabbix.methods().getToken()
    let test2 = await zabbix.methods().getToken()

    let test3 = await zabbix.methods().updateToken()
    console.log(test1 + " " + test2 + " " + test3)

    let test4 = await zabbix.methods().getHosts()
    console.log(test4)
    // let test5 = await zabbix.methods().getHostGroup()
    //console.log(test5)



    let test1 = await zabbix.methods().getItems(10084)
    console.log(test1)
*/

    let test1 = await zabbix.methods().getHistory(23296)
    console.log(test1)


}

main()