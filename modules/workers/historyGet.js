const Worker = require('./worker')
const ChangItems = require('./changItems')
const ZabbixAPI = require('../zabbix/zabbixAPI')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')

class HistoryGet extends Worker {
    constructor(args) {
        super(args)
        this._items = args.items || []
        this.controllerSetInterval(this._inProgress)
    }

    get items() {
        return this._items
    }

    set items(value) {
        this._items = value
    }

    controllerSetInterval(value) {

        console.log(`controllerSetInterval  (${value})`)
        if (value && !this.status) {
            this.pollHistory()
        }
    }

    updateProperties() {
        let dataZabbixCli = ZabbixCli.findById(this._id).populate('items')
        this.items = dataZabbixCli.items
        super.changer(dataZabbixCli)
        return dataZabbixCli
    }

    pollHistory() {
        console.log("start")

        this.timerID = setInterval(async () => { //TODO: Попробовать рекурсивный setTimeout

            this.updateProperties()

            if (this._inProgress) {
                this.status = true

                for(let [key, value] of ChangItems.parsItems(this.items).entries()){

                    if(value.length > 0) {
                        let reqParams = {
                            itemids: value,
                            time_from: this.lastTime || Date.now() / 1000 | 0,
                            history: key
                        }

                        try {
                            let dataHistory = await ZabbixAPI.getHistory(this._url, this._token, reqParams)
                            this.isError = false

                            if(dataHistory.length > 0) {
                                console.log(dataHistory)
                            }
                        } catch (e) {
                            console.log(e)
                            this.isError = true
                        }
                    }
                }
                this.lastTime = Date.now() / 1000 | 0

            } else {
                console.log("stop")
                clearInterval(this.timerID)
                this.status = false
            }

        }, this.intervalTime)

    }

}

module.exports = HistoryGet