

/*



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
        }
*/
