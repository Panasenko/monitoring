const Worker = require('./worker')
const ChangItems = require('./changItems')
const ZabbixAPI = require('../zabbix/zabbixAPI')

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

    set inProgress(value) {
        this._inProgress = value
        this.controllerSetInterval(value)

    }

    addItems(items){
        this.items = ChangItems.createItems(this.items, items)
    }

    deleteItems(items){
        this.items = ChangItems.deleteItems(this.items, items)
    }

    controllerSetInterval(value) {
        if (value && !this.status) {
            this.pollHistory()
        }
    }

    pollHistory() {
        this.timerID = setInterval(async () => { //TODO: Попробовать рекурсивный setTimeout
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
                clearInterval(this.timerID)
                this.status = false
            }

        }, this.intervalTime)

    }

}

module.exports = HistoryGet