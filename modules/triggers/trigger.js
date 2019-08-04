const _ = require('lodash')
const Event = require('./event')

class Trigger {
    constructor(args) {
        this._id = args._id
        this.name = args.name
        this.itemid = args.itemid
        this.eventStatus = false
        this.eventObj = null
        this.eventTimeStart = null
        this.eventTimeUpdate = null
        this.closeTime = args.closeTime

        this.disaster = this.initInstruction(`intervalTime(clock,8,19)`)
        this.high = null//eval(`1 === 1`)
        this.average = eval(`1 !== 1`)
        this.warning = eval(`1 !== 1`)
        this.information = eval(`1 !== 1`)
    }

    /*
        validateInstruction(instruction) {
            let RegExp = //
            (instruction.serch(new RegExp(regText, "g")) !== -1) ? this.instruction = instruction
                : throw new Error("bad instruction")
        }*/


    initInstruction(instruction) {
        return new Function(`{clock, value}, intervalTime`, `return ${instruction}`)
    }

    intervalTime(clock, from, before) {
        let getHours = new Date(+clock * 1000).getHours()
        return from <= getHours && getHours <= before
    }

    workerAlerts(itemsObj) {
        if (!this.eventStatus) {
            if (_.isObject(itemsObj)) {
                this.eventStatus = true

                itemsObj.status = "active"
                itemsObj.eventTimeStart = this.eventTimeStart = new Date().getTime() / 1000 | 0
            } else {
                throw new Error("item not transferred")
            }
            return this.eventObj = new Event(itemsObj)
        } else {
            if (!_.isNull(this.eventObj)) {

                if (_.isObject(itemsObj)) {

                    itemsObj.status = "active"
                    itemsObj.eventTimeUpdate = this.eventTimeUpdate = new Date().getTime() / 1000 | 0
                } else {
                    throw new Error("item not transferred")
                }

                return this.eventObj.updateEvent(itemsObj)
            }

            throw new Error("Event object not created")
        }

    }

    check(data) {
        let intervalTime = this.intervalTime

        let methods = [
            intervalTime
        ]

        switch (true) {
            case this.disaster(data, ...methods):
                console.log("disaster")
                data.level = "disaster"
                data.description = `Triggers - ${this.name} .Level ${data.level}`
                this.workerAlerts(data)
                break
            case this.high:
                console.log("high")
                data.level = "high"
                data.description = `Triggers - ${this.name} .Level ${data.level}`
                this.workerAlerts(data)
                break
            case this.average:
                console.log("average")
                data.level = "average"
                data.description = `Triggers - ${this.name} .Level ${data.level}`
                this.workerAlerts(data)
                break
            case this.warning:
                console.log("warning")
                data.level = "warning"
                data.description = `Triggers - ${this.name} .Level ${data.level}`
                this.workerAlerts(data)
                break
            case this.information:
                console.log("information")
                data.level = "information"
                data.description = `Triggers - ${this.name} .Level ${data.level}`
                this.workerAlerts(data)
                break
            default:
                console.log("none")
                if (this.eventStatus && this.eventTimeUpdate + 300 < (new Date().getTime() / 1000 | 0)) {

                }
        }
    }
}

let obj = new Trigger({name: "test", _id: "1111111111111"})
let data = {
    itemid: '23301',
    clock: '1564935081',
    value: '0.3551',
    ns: '545600722'
}

obj.check(data)