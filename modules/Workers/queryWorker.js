const _ = require('lodash')
const ZabbixAPI = require('../Zabbix/zabbixAPI')


class QueryWorker {
    constructor(args) {
        this._zabbixCli_id = args.zabbixCli_id
        this._name = args.name
        this._description = args.description
        this._url = args.url
        this._token = args.token
        this._items = args.items
        this._intervalTime = args.intervalTime || 3000
        this._inProgress = args.inProgress || false
        this._lastTime = args.lastTime || null
        this._error = []
        this._isError = false
        this._timerID = null

        this.pollHistory()
    }

    get timerID() {
        return this._timerID
    }

    set timerID(value) {
        this._timerID = value
    }

    get items() {
        return this._items
    }

    set items(value) {
        this._items = value
    }

    get lastTime() {
        return this._lastTime
    }

    set lastTime(value) {
        this._lastTime = value
    }

    get intervalTime() {
        return this._intervalTime
    }

    set intervalTime(value) {
        this._intervalTime = value
    }

    get isError() {
        return this._isError
    }

    set isError(value) {
        this._isError = value
    }

    parsItems(items) {
        if (_.every(items, value => _.isObject(value))) {
            return _.reduce(items, function (accumulator, value) {
                accumulator.push(value.itemid)
                return accumulator
            }, [])
        } else if (_.every(items, value => _.isString(value))) {
            return items
        } else {
            throw new Error('function parsItems - incorrect params')
        }
    }

    pollHistory() {
        this.timerID = setInterval(async () => { //TODO: Попробовать рекурсивный setTimeout
            if (this._inProgress) {
                let reqParams = {
                    itemids: this.parsItems(this.items),
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
            }
        }, this.intervalTime)
    }

    changer(args) {


    }
}

module.exports = QueryWorker
