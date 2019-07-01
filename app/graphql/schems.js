const zabbixAPI = require('./../modules/Zabbix/ZabbixAPI')
const VersionType = require('./Types/VersionType')
const LoginType = require('./Types/LoginType')
const HostType = require('./Types/HostType')

let {
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList
} = require('graphql');

const ZabbixQueryRootType = new GraphQLObjectType({
    name: "ZabbixAppSchema",
    description: "Blog Application Schema Query Root",
    fields: () => ({
        version: {
            type: VersionType,
            description: "List of all Authors",
            args: { url: { type: GraphQLString } },
            resolve: async (parent, args) => {
                let z = await new zabbixAPI(args.url)
                let vers = await z.getVersion({})
                return {version: vers}

            }
        },
        login: {
            type: LoginType,
            description: "Authorization on zabbix",
            args: {
                url: { type: GraphQLString },
                user: { type: GraphQLString },
                password: { type: GraphQLString }
                },
            resolve: async (parent, args) => {
                let z = await new zabbixAPI(args.url)
                let token = await z.login({user: args.user, password: args.password})
                console.log(token)
                return {
                    token: token
                }

            }
        },
        hosts: {
            type: new GraphQLList(HostType),
            description: "List of all Authors",
            args: {
                url: { type: GraphQLString },
                token: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                console.log(parent)
                let z = await new zabbixAPI(args.url, args.token)
                let hosts = await z.getHosts()
                console.log(hosts)
                return hosts

            }
        }
    })
});

const ZabbixAppSchema = new GraphQLSchema({
    query: ZabbixQueryRootType

});

module.exports = ZabbixAppSchema