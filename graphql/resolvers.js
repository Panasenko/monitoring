const _ = require('lodash')
const zabbixAPI = require('../modules/Zabbix/zabbixAPI')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')

module.exports = {
    Query: {
        zabbixCliFindById: async (_, args) => {
            return ZabbixCli.findById(args._id)
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
        createZabbixCli: async (_, args) => {
            try {
                let newUser = new ZabbixCli({
                    "name": args.name,
                    "description": args.description,
                    "url": args.url,
                    "token": args.token,
                    "inProgress": args.inProgress || false,
                    "lastTime": args.lastTime || null
                })
                return await newUser.save()
            } catch (error) {
                return error
            }
        },
        updateZabbixCli: async (_, args) => {

        }, //TODO Добавить реализацию обновления
        deleteZabbixCli: async (_, args) => {

            return ZabbixCli.findOneAndDelete({_id: args._id})
        },


        createSubdocItemsZabbixCli: async (_, args) => { //TODO выяснить какого Х добавляются одинаковые элементы без проверки уникальности. Добавить доп проверки

            try {
                let result = await ZabbixCli.findById(args._id)

                await result.items.push({
                    itemid: args.itemid,
                    hostid: args.hostid,
                    name: args.name,
                    description: args.description
                })


                await result.save()

                return await _.last(result.items) //TODO исправить возвращение результата

            } catch (e) {
                return e
            }

        },
        deleteSubdocItemsZabbixCli: async (_, args) => {

            try {
                let result = await ZabbixCli.findById(args._id)
                let removedItem = await result.items.id(args.child_id).remove()
                await result.save()
                return await removedItem
            } catch (e) {
                return e
            }

        },


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
            let z = await new zabbixAPI(args)
            let Apps = await z.getItems(parent)
            return _.filter(Apps, a => a.hostid === parent.hostid)
        }
    }


}
