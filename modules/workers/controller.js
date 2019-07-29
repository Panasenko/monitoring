const _ = require('lodash')
const Observer = require('./observer')
const HistoryGet = require('./historyGet')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')

class Controller {
    constructor(){
        this.observer = new Observer()
        this.addWorkers()
    }

    async addWorkers(){
        let arrZabbixCli = await ZabbixCli.find({}).populate('items')
        if(_.isArray(await arrZabbixCli)){
            _.forEach(await arrZabbixCli, async (zCliData) => {
                return await this.observer.subscribe(new HistoryGet(zCliData))
            })
        }
    }

    getWorkers(){
        return this.observer.observer
    }

    updateWorkers(id, data){
        this.observer.updateSubscribe(id, data)
    }

    deleteWorkers(id){
        this.observer.unsubscribe(id)
    }

    createItemsWorkers(id, items){
        this.observer.createItemsSubscribe (id, items)
    }

    deleteItemsWorkers(id, items){
        this.observer.deleteItemsSubscribe (id, items)
    }

}

module.exports = Controller