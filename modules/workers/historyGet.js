const Worker = require('./worker')
const ChangItems = require('./changItems')
const ZabbixAPI = require('../zabbix/zabbixAPI')

class HistoryGet extends Worker {
    constructor(args) {
        super(args)
        this._items = args.items

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

    controllerSetInterval(value) {
        if (value && !this.status) {
            this.pollHistory()
        }
    }

    pollHistory() {
        this.timerID = setInterval(async () => { //TODO: Попробовать рекурсивный setTimeout
            if (this._inProgress) {
                this.status = true

                let reqParams = {
                    itemids: ChangItems.parsItems(this.items),
                    time_from: this.lastTime || Date.now() / 1000 | 0
                }

                try {
                    let dataHistory = await ZabbixAPI.getHistory(this._url, this._token, reqParams)
                    this.lastTime = Date.now() / 1000 | 0
                    this.isError = false
                    console.log(dataHistory)

                } catch (e) {
                    console.log(e)
                    this.isError = true
                }
            } else {
                clearInterval(this.timerID)
                this.status = false
            }

        }, this.intervalTime)

    }

}

module.exports = HistoryGet