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
            let z = await new zabbixAPI(args) //TODO Попробовать вынести объект выше, что бы не создавать много экземпляров
            console.log(z)
            let token = await z.login({user: args.user, password: args.password})
            console.log(token)
            return {
                token: token
            }
        },
        version: async (_, args) => {

            let z = await new zabbixAPI(args)
            let vers = await z.getVersion({})
            return {version: vers}
        },
        hostgroup: async (_, args) => {
            let z = await new zabbixAPI(args)
            return await z.getHostGroup()

        },
        hosts: async (_, args) => {
            let z = await new zabbixAPI(args)
            return await z.getHosts()

        },
        applications: async (_, args) => {
            let z = await new zabbixAPI(args)
            return await z.getApplications(args)
        },
        graphics: async (parent, args) => {
            let z = await new zabbixAPI(args)
            return await z.getGraphics(args)
        },
        items: async (parent, args) => {
            let z = await new zabbixAPI(args)
            return await z.getItems(args)
        }
    },
    Mutation: {
        createZabbixCli: async (_, args) => { //TODO Добавить проверку наличия записи в БД
            try {
                let newUser = new ModelAuth({
                    "name": args.name,
                    "discription": args.discription,
                    "url": args.url,
                    "token": args.token
                })

                return await newUser.save()
            } catch (error) {
                return error

            }
        }
    },
    Hosts: {
        applications: async (parent, args) => {
            let z = await new zabbixAPI(args)
            let Apps = await z.getApplications(parent)
            return _.filter(Apps, a => a.hostid === parent.hostid)
        },

        graphics: async (parent, args) => {
            let z = await new zabbixAPI(args)
            let Apps = await z.getGraphics(parent)
            return _.filter(Apps, a => a.hosts[0].hostid === parent.hostid)
        },

        items: async (parent, args) => {
            console.log(parent)

            let z = await new zabbixAPI(args)
            let Apps = await z.getItems(parent)
            return _.filter(Apps, a => a.hostid === parent.hostid)
        }
    }


}
