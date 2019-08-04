const mongoose = require('mongoose')
const Events = mongoose.model('Events')

class Event{
    constructor(args){
        this.eventID = `E${+args.eventTimeStart}_${+args.itemid}`
        this.itemid = args.itemid
        this.description = args.description
        this.status = args.status
        this.level = args.level
        this.eventTimeStart = args.eventTimeStart
        this.lastClock = args.clock
        this.lastValue = args.value
        this.eventTimeUpdate = null
        this.eventTimeClose = null
        this.historyChange = []

        this.addEvent()
    }

    async addEvent(){
        let newData = {}
        newData.eventID = this.eventID
        newData.itemid = this.itemid
        newData.status = this.status
        newData.level = this.level
        newData.eventTimeStart = this.eventTimeStart
        newData.lastClock = this.lastClock
        newData.lastValue = this.lastValue
        newData.historyChange = this.historyChange.push(newData)

        try {
           return await Events.create(newData)
       }catch (e) {
           throw new Error(e)
       }

    }

    updateEvent(){

    }



}

module.exports = Event