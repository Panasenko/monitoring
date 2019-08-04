const mongoose = require('mongoose')
const Events = mongoose.model('Events')

class Event{
    constructor(args){
        this.eventID = `E${args.eventStart}${args.itemid}`
        this.itemid = args.itemid
        this.description = args.description
        this.level = args.level
        this.eventTimeStart = args.eventStart
        this.eventTimeClose = null
        this.lastClock = args.clock
        this.lastValue = args.value
        this.historyChange = []
    }

    addEvent(){

    }

    updateEvent(){

    }



}

module.exports = Event