const _ = require('lodash')
const Event = require('./event')
const Instruction = require('./instruction')
const Methods = require('./methods')
const Time = require('./time')

class Trigger {
    constructor(args) {
        this._id = args._id
        this.name = args.name
        this.itemid = args.itemid
        this.closeTime = args.closeTime || 5
        this.eventStatus = false
        this.eventObj = null
        this.eventTimeStart = null

        this.disaster = Instruction.init(args.disaster)
        this.high = Instruction.init(args.high)
        this.average = Instruction.init(args.average)
        this.warning = Instruction.init(args.warning)
        this.information = Instruction.init(args.information)
    }

    workerAlerts(data) {
        if (!this.eventStatus) {
            this.eventStatus = true
            this.eventObj = new Event(data)
            this.eventTimeStart = this.eventObj.eventTimeStart
            return this.eventObj
        } else {
            if (!_.isNull(this.eventObj)) {
                return this.eventObj.updateProperties(data)
            }
            throw new Error("Event object not created")
        }
    }

    closeAlerts(){
        console.log("none")
        if (this.eventStatus && this.eventTimeUpdate + (this.closeTime * 60) <= (new Date().getTime() / 1000 | 0)) {

            this.eventStatus = false
            this.eventTimeStart = null
            this.eventTimeUpdate = null
            data.status = "close"
            data.eventTimeUpdate = this.eventTimeUpdate = this.nowTime()
            this.eventObj.updateProperties(data)
            this.eventObj = null
        }

     /*   switch (true) {
            case (this.):

        }*/
    }

    initParams() {
        let intervalTime = Methods.intervalTime
        let eventTimeStart = (_.isNull(this.eventTimeStart)) ? Time.unixTime() : this.eventTimeStart
        let nowTime = Time.unixTime()

        return [
            intervalTime,
            eventTimeStart,
            nowTime
        ]
    }

    paramAlert(data, level) {
        data.itemid = this.itemid
        data.triggerID = this._id
        data.status = "active"
        data.level = level
        return data
    }

    check(data) {
        let params = this.initParams()

        switch (true) {
            case this.disaster(data, ...params):
                console.log("disaster")
                this.workerAlerts(this.paramAlert(data, "disaster"))
                break
            case this.high(data, ...params):
                console.log("high")
                this.workerAlerts(this.paramAlert(data, "high"))
                break
            case this.average(data, ...params):
                console.log("average")
                this.workerAlerts(this.paramAlert(data, "average"))
                break
            case this.warning(data, ...params):
                console.log("warning")
                this.workerAlerts(this.paramAlert(data, "average"))
                break
            case this.information(data, ...params):
                console.log("information")
                this.workerAlerts(this.paramAlert(data, "information"))
                break
            default: this.closeAlerts()
        }
    }
}

let nobj = {
    name: "test",
    _id: "1111111111111",
    itemid: "434343",
    closeTime: 5,
    disaster: "value >= 0.3 && eventTimeStart + 240 <= nowTime",
    high: "value >= 0.3 && eventTimeStart + 180 <= nowTime",
    average: "value >= 0.3 && eventTimeStart + 120 <= nowTime",
    warning: "value >= 0.3 && eventTimeStart + 60 <= nowTime",
    information: "value >= 0.3"
}

let obj = new Trigger(nobj)
let data = {
    itemid: '23301',
    clock: '1565036853',
    value: '0.4551',
    ns: '545600722'
}

obj.check(data)
