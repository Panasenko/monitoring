const _ = require('lodash')
const Observer = require('./observer')
const HistoryGet = require('./historyGet')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')

class Controller {
    constructor(){
        this._observer = new Observer()
    }

    get observer(){
        return this._observer
    }

    async addWorkers(){
        let arrZabbixCli = await ZabbixCli.find({}).populate('items')

        if(_.isArray(await arrZabbixCli)){
            _.forEach(await arrZabbixCli, async (zCliData) => {
                return await this.observer.subscribe(new HistoryGet(zCliData))
            })
        }


    }

    static updateProperties(id, data){
        this.observer.update(id, data)
    }

}

module.exports = Controller