const _ = require('lodash')
const zabbixAPI = require('../modules/Zabbix/ZabbixAPI')
const mongoose = require('mongoose')
const ModelAuth = mongoose.model('AuthZabbix')

module.exports = {
    Query: {
        zabbixCli: async (_, args) => {
            return ModelAuth.findOne({"url": args.url})
        },
        token: async (_, args) => {
            let z = await new zabbixAPI(args.url)
            console.log(z)
            let token = await z.login({user: args.user, password: args.password})
            console.log(token)
            return {
                token: token
            }
        },
        version: async (_, args) => {

            let z = await new zabbixAPI(args.url)
            let vers = await z.getVersion({})
            return {version: vers}
        },
        hostgroup: async (_, args) => {
            let z = await new zabbixAPI(args.url, args.token)
            return await z.getHostGroup()

        },
        hosts: async (_, args) => {
            let z = await new zabbixAPI(args.url, args.token)
            return await z.getHosts()

        },
        applications: async (_, args) => {
            let z = await new zabbixAPI(args.url, args.token)
            return await z.getApplications({hostids: args.hostid})
        }
    },
    Mutation: {
        createZabbixCli: async (_, args) => {
            try {
                let newUser = new ModelAuth({
                    "name": args.name,
                    "discription": args.discription,
                    "url": args.url,
                    "token": args.token
                })

                return await newUser.save()
            } catch (e) {
                return e

            }
        }
    },
    Hosts: {
        applications: async (parent, args) => {
            let z = await new zabbixAPI(args.url, args.token)
            let Apps = await z.getApplications(parent)
            return _.filter(Apps, a => a.hostid === parent.hostid)
        }
    }


}