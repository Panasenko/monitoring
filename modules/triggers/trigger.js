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

    workerAlerts(itemsObj){
        if(!this.eventStatus){
            if(_.isObject(itemsObj)){
                itemsObj.eventStatus = this.eventStatus = true
                itemsObj.eventTimeStart = this.eventTimeStart = new Date().getTime()/1000 | 0
            } else {
                throw new Error("item not transferred")
            }
            return this.eventObj = new Event(itemsObj)
        } else {
            if(!_.isNull(this.eventObj)){

                if(_.isObject(itemsObj)){
                    itemsObj.eventStatus = this.eventStatus = true
                    itemsObj.eventTimeStart = this.eventTimeStart = new Date().getTime()/1000 | 0
                } else {
                    throw new Error("item not transferred")
                }

                return this.eventObj.updateEvent()
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
                this.workerAlerts(data)
                break
            case this.high:
                console.log("high")
                this.alertTime = new Date().getTime()/1000 | 0
                break
            case this.average:
                console.log("average")
                this.alertTime = new Date().getTime()/1000 | 0
                break
            case this.warning:
                console.log("warning")
                this.alertTime = new Date().getTime()/1000 | 0
                break
            case this.information:
                console.log("information")
                this.alertTime = new Date().getTime()/1000 | 0
                break
            default:
                console.log("none")
                if(this.alertTime){

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