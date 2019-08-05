const _ = require('lodash')
const Event = require('./event')

class Trigger {
    constructor(args) {
        this._id = args._id
        this.name = args.name
        this.itemid = args.itemid
        this.closeTime = args.closeTime || 5
        this.eventStatus = false
        this.eventObj = null
        this.eventTimeStart = null
        this.eventTimeUpdate = null

        this.disaster = this.initInstruction(args.disaster)
        this.high = this.initInstruction(args.high)
        this.average = this.initInstruction(args.average)
        this.warning = this.initInstruction(args.warning)
        this.information = this.initInstruction(args.information)
    }

    initInstruction(instruction) {
        if(this.validateInstruction(instruction)){
            let args = `{clock, value}, intervalTime, eventTimeStart, nowTime`
            let bodyFunc = `return ${instruction}`

            return new Function(args, bodyFunc)
        }
        throw new Error("bad instruction")

    }

    validateInstruction(instruction) {
        let regExp = /((\w|\s)=(\w|\s)|(return|function|throw)|(["'`{}])|(=[>]))/gi
        return !regExp.test(instruction)
    }


    intervalTime(clock, from, before) {
        let getHours = new Date(clock * 1000).getHours()
        return from <= getHours && getHours <= before
    }

    nowTime(){
        return new Date().getTime() / 1000 | 0
    }

    workerAlerts(itemsObj) {
        if (!this.eventStatus) {
            if (_.isObject(itemsObj)) {
                this.eventStatus = true

                itemsObj.status = "active"
                itemsObj.eventTimeStart = this.eventTimeStart = this.nowTime()
            } else {
                throw new Error("item not transferred")
            }
            return this.eventObj = new Event(itemsObj)
        } else {
            if (!_.isNull(this.eventObj)) {

                if (_.isObject(itemsObj)) {

                    itemsObj.status = "active"
                    itemsObj.eventTimeUpdate = this.eventTimeUpdate = this.nowTime()
                } else {
                    throw new Error("item not transferred")
                }

                return this.eventObj.updateProperties(itemsObj)
            }

            throw new Error("Event object not created")
        }

    }

    check(data) {
        let intervalTime = this.intervalTime
        let eventTimeStart = (_.isNull(this.eventTimeStart))? this.nowTime():this.eventTimeStart
        let nowTime = this.nowTime()

        let params = [
            intervalTime,
            eventTimeStart,
            nowTime
        ]

        switch (true) {
            case this.disaster(data, ...params):
                console.log("disaster")
                console.log(data)
                console.log(...params)
                data.level = "disaster"
                data.description = `Triggers - ${this.name} .Level ${data.level}`
                this.workerAlerts(data)
                break
            case this.high(data, ...params):
                console.log("high")
                data.level = "high"
                data.description = `Triggers - ${this.name} .Level ${data.level}`
                this.workerAlerts(data)
                break
            case this.average(data, ...params):
                console.log("average")
                data.level = "average"
                data.description = `Triggers - ${this.name} .Level ${data.level}`
                this.workerAlerts(data)
                break
            case this.warning(data, ...params):
                console.log("warning")
                data.level = "warning"
                data.description = `Triggers - ${this.name} .Level ${data.level}`
                this.workerAlerts(data)
                break
            case this.information(data, ...params):
                console.log("information")
                data.level = "information"
                data.description = `Triggers - ${this.name} .Level ${data.level}`
                this.workerAlerts(data)
                break
            default:
                console.log("none")
                if (this.eventStatus && this.eventTimeUpdate + (this.closeTime * 60) <= (new Date().getTime() / 1000 | 0)) {

                    this.eventStatus = false
                    this.eventObj = null
                    this.eventTimeStart = null
                    this.eventTimeUpdate = null

                    data.status = "close"
                    data.eventTimeUpdate = this.eventTimeUpdate = this.nowTime()

                    this.eventObj.updateProperties(data)
                }
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