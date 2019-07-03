const zabbixAPI = require('../modules/Zabbix/ZabbixAPI')

module.exports = {
    Query: {
        token: async (_,args) => {
            let z = await new zabbixAPI(args.url)
            console.log(z)
            let token = await z.login({user: args.user, password: args.password})
            console.log(token)
            return {
                token: token
            }
        },
        version: async (_,args) => {
            let z = await new zabbixAPI(args.url)
            let vers = await z.getVersion({})
            return {version: vers}
        },
        hosts: async (_,args) => {
            let z = await new zabbixAPI(args.url, args.token)
            let hosts = await z.getHosts()
            console.log(hosts)
            return hosts
        }
    },
    Mutation: {
        createZabbixCli: (_, args) => {
console.log(args)
            return {test: args.url}
        }
    }
}

