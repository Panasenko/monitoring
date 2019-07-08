const _ = require('lodash')
const zabbixAPI = require('../modules/Zabbix/zabbixAPI')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('AuthZabbix')
const ItemsZabbix = mongoose.model('ItemsZabbix')

module.exports = {
    Query: {
        zabbixCli: async (_, args) => {
            return ZabbixCli.findOne({"url": args.url})
        },


        getItems: async (_, args) => {
            return ItemsZabbix.find({"zabbixCli_id": args.zabbixCli_id})
        },
        getItem: async (_, args) => {
            return ItemsZabbix.findOne({"itemid": args.itemid})
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
        }, //TODO Добавить реализацию удаления из БД

        createItem: async (_, args) => { //TODO Добавить проверку наличия записи в БД
            try {
                let newItems = new ItemsZabbix({
                    "zabbixCli_id": args.zabbixCli_id,
                    "name": args.name,
                    "hostid": args.hostid,
                    "itemid": args.itemid,
                    "description": args.description,
                    "inProgress": args.inProgress
                })

                return await newItems.save()
            } catch (error) {
                return error

            }
        },
        updateItem: async (_, args) => { //TODO Добавить проверку наличия записи в БД

        }, //TODO Добавить реализацию обновления
        deleteItem: async (_, args) => { //TODO Добавить проверку наличия записи в БД

        } //TODO Добавить реализацию удаления из БД
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
    },
    ZabbixCli: {
        getItems: async (parent, args) => {
            return ItemsZabbix.find({"zabbixCli_id": parent._id})
        },
    }


}
