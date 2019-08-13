const Time = require('./time')
const mongoose = require('mongoose')
const Events = mongoose.model('EventsAlert')
const Triggers = mongoose.model('Triggers')

class Event {
    static async findEvent(id) {
        try {
            return await Events.findById(id)
        } catch (e) {
            throw new Error(e)
        }

    }

    static async addEvent(args) {
        args.eventTimeStart = Time.nowTime()
        args.historyChange = []
        args.historyChange.push(data)

        try {
            let newEvent = await Events.create(args)
            await Triggers.findByIdAndUpdate(newEvent.TriggersIDSchema, {eventIDSchema: newEvent._id})
            return newEvent
        } catch (e) {
            throw new Error(e)
        }

    }

    static async updateEvent(id, args) {
        args.eventTimeUpdate = Time.nowTime()
        try {
            return await Events.findByIdAndUpdate(id, args, function (err, data) {
                data.historyChange.push(data)
                data.save()
            })
        } catch (e) {
            throw new Error(e)
        }
    }

    static async closeEvent(id, args) {
        args.eventTimeClose = Time.nowTime()
        try {
            let closeEvent = await Events.findByIdAndUpdate(id, data, function (err, data) {
                data.historyChange.push(data)
                data.save()
            })
            await Triggers.findByIdAndUpdate(closeEvent.TriggersIDSchema, {eventIDSchema: null})
            return closeEvent
        } catch (e) {
            throw new Error(e)
        }
    }

}

module.exports = Event