const _ = require('lodash')
const Observer = require('./observer')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')

class Controller {
    constructor(newObject) {
        this.newObject = newObject
        this.ob = new Observer()
        this.startWorkers()
    }

    async startWorkers() {
        let data = await ZabbixCli.find({}).populate('items')
        if (_.isArray(data)) {
            _.forEach(data, async (zData) => {
                return await this.ob.subscribe(new this.newObject(zData))
            })
        }
    }

    async createWorkers(data) {
        return await this.ob.subscribe(new this.newObject(data))
    }

    getWorkers() {
        return this.ob.getSubscribe()
    }

    updateWorkers(id) {
        this.ob.updateSubscribe(id)
    }

    deleteWorkers(id) {
        this.ob.unsubscribe(id)
    }

}


module.exports = Controller