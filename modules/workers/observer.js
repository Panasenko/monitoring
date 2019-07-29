const _ = require('lodash')

class EventObserver {
    constructor () {
        this._observers = []
    }

    subscribe (fn) {
        this._observers.push(fn)
    }

    getSubscribe(){
        return this._observers
    }

    unsubscribe (id) {
        this._observers = this._observers.filter(subscriber => subscriber._id !== id)
    }

    changSubscribe (id, data) {
        this._observers.forEach(subscriber => {
            if(subscriber._id === id){
                subscriber.updateProperties(data)
            }
        })
    }

    updateSubscribe (id) {
        this._observers.forEach(subscriber => {
            if(subscriber._id === id){
                subscriber.updateProperties()
            }
        })
    }

}

module.exports = EventObserver




