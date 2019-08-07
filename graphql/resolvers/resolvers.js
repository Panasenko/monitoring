const _ = require('lodash')
const importQuery = require('./Query')
const importHosts = require('./Hosts')

const ZabbixCliMutation = require('./mutations/mutation.ZabbixCli')
const ItemsMutation = require('./mutations/mutation.Items')
const TriggersMutation = require('./mutations/mutation.Triggers')


class Resolvers{
    constructor(){
        this.ZabbixCliMutation = new ZabbixCliMutation()
        this.ItemsMutation = new ItemsMutation()
        this.TriggersMutation = new TriggersMutation()

        return {
            Query: importQuery,
            Mutation: this.mutation(),
            Hosts: importHosts
        }
    }

    mutation(){
        return {
            createZabbixCli: this.ZabbixCliMutation.createZabbixCli,
            updateZabbixCli: this.ZabbixCliMutation.updateZabbixCli,
            deleteZabbixCli: this.ZabbixCliMutation.deleteZabbixCli,

            createItemsToZabbixCli: this.ItemsMutation.createItemsToZabbixCli,
            deleteItemsToZabbixCli: this.ItemsMutation.deleteItemsToZabbixCli,

            createTriggersToItems: this.TriggersMutation.createTriggersToItems,
            deleteTriggersToItems: this.TriggersMutation.deleteTriggersToItems
        }
    }

}

module.exports = new Resolvers()