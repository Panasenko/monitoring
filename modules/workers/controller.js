const _ = require('lodash')
const Observer = require('./observer')
const ZabbixCliDB = require('../../database/controllers/controll.ZabbixCli')

class Controller { //TODO: Соеденить с обсервером
    constructor(newObject) {
        this.newObject = newObject
        this.ob = new Observer()
        this.startWorkers()
    }

    async startWorkers() {
        let data = await ZabbixCliDB.find({})
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