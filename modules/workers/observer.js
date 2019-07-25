const _ = require('lodash')

class EventObserver {
    constructor () {
        this.observers = []
    }

    subscribe (fn) {
        this.observers.push(fn)
    }

    unsubscribe (fn) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }

    update (id, data) {
        this.observers.forEach(subscriber => {
            if(subscriber._id === id){
                subscriber.changer(data)
            }

        })
    }
}

module.exports = EventObserver




