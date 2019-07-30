const _ = require('lodash')
const Observer = require('./observer')
const HistoryGet = require('./historyGet')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')

let Controller = {

    ob: null,

    observer: () => {
        if (!_.isNull(this.ob)) {
            return this.ob = new Observer()
        }
        return this.ob
    },

    startWorkers: async () => {
        let arrZabbixCli = await ZabbixCli.find({}).populate('items')
        if (_.isArray(await arrZabbixCli)) {
            _.forEach(await arrZabbixCli, async (zCliData) => {
                return await this.ob.subscribe(new HistoryGet(zCliData))
            })
        }
    },

    createWorkers: async (data) => {
        return await this.ob.subscribe(new HistoryGet(data))
    },

    getWorkers: () => {
        return this.ob.getSubscribe()
    },

    updateWorkers: (id) => {
        this.ob.updateSubscribe(id)
    },

    deleteWorkers: (id) => {
        this.ob.unsubscribe(id)
    }

}

Controller.observer()
Controller.startWorkers()

module.exports = Controller