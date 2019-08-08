const mongoose = require('mongoose')
//const Events = mongoose.model('EventsAlert')

class Event{
    constructor(args){
        this.triggerID = args.triggerID
        this.itemid = args.itemid
        this.description = this.initDescription()
        this.status = args.status
        this.level = args.level
        this.eventTimeStart = args.eventTimeStart || null

        this.eventTimeUpdate = args.eventTimeUpdate || null
        this.eventTimeNormalized = args.eventTimeNormalized || null
        this.eventTimeClose = args.eventTimeClose || null
        this.lastClock = args.clock
        this.lastValue = args.value
        this.historyChange = []

        this.addEvent()
    }

    initDescription(){
        return `Элемент данных ${this.itemid} в статусе ${this.status}, уровень ${this.level}`
    }

    seHistory(){

    }

    async addEvent(){
        let newData = {}
        newData.itemid = this.itemid
        newData.status = this.status
        newData.level = this.level
        newData.eventTimeStart = this.eventTimeStart
        newData.lastClock = this.lastClock
        newData.lastValue = this.lastValue
        newData.historyChange = this.historyChange.push(newData)

        try {
           //return await Events.create(newData)
       }catch (e) {
           throw new Error(e)
       }

    }

    updateProperties(){


    this.updateEvent()
    }

    updateEvent(){

    }



}

module.exports = Event