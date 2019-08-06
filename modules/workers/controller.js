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
        let data = await ZabbixCli.find({}).populate({
            path: 'items',
            model: 'Items',
            populate: {
                path: 'triggers',
                model: 'Triggers'
            }
        })

        if (_.isArray(data)) {
            _.forEach(data, async (zData) => {
                return await this.ob.subscribe(new this.newObject(zData))
            })
        }
    }

    createWorkers(data) {
        return this.ob.subscribe(new this.newObject(data))
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