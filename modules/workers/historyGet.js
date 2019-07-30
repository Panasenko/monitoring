const Worker = require('./worker')
const ChangItems = require('./changItems')
const ZabbixAPI = require('../zabbix/zabbixAPI')
const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')

class HistoryGet extends Worker {
    constructor(args) {
        super(args)
        this._items = args.items || []
        this.updateProperties()
    }

    get items() {
        return this._items
    }

    set items(value) {
        this._items = value
    }

    async updateProperties() {
        let data = await ZabbixCli.findById(this._id).populate('items')
        console.log("получение данных из БД")

        this.name = data.name
        this.description = data.description
        this.url = data.url
        this.token = data.token
        this.intervalTime = data.intervalTime
        this.inProgress = data.inProgress
        this.lastTime = data.lastTime
        this.isError = data.isError
        this.items = data.items

        if (this.inProgress && !this.status) {
            return this.workerHistory()
        }

    }

    async setPropertiesToDB() {
        console.log("обновление данных в БД")

        let dataUpdate = {}
        dataUpdate.lastTime = this.lastTime
        dataUpdate.isError = this.isError


        return await ZabbixCli.findByIdAndUpdate(this._id, dataUpdate, {new: true})

    }

    async callHistoryAPI() {

        console.log("Вызов АПИ")

        for (let [key, value] of ChangItems.parsItems(this.items).entries()) {
            if (value.length > 0) {
                let reqParams = {}
                reqParams.itemids = value
                reqParams.time_from = this.lastTime || Date.now() / 1000 | 0
                reqParams.history = key

                try {
                    let dataHistory = await ZabbixAPI.getHistory(this._url, this._token, reqParams)
                    this.isError = false

                    if (dataHistory.length > 0) {
                        console.log(dataHistory)
                    }
                } catch (e) {
                    console.log(e)
                    this.isError = true
                }
            }
        }
    }

    workerHistory() {
        console.log("start")

        this.timerID = setInterval(async () => { //TODO: Попробовать рекурсивный setTimeout

            if (this.inProgress && this.items.length > 0) {
                this.status = true
                await this.callHistoryAPI()
                this.lastTime = Date.now() / 1000 | 0
            } else {
                console.log("stop")
                clearInterval(this.timerID)
                this.status = false
            }

            await this.setPropertiesToDB()

        }, this.intervalTime)

    }


}

module.exports = HistoryGet