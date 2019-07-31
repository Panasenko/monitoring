const _ = require('lodash')

class EventObserver {
    constructor () {
        this._observers = []
    }

    subscribe (obj) {
        this._observers.push(obj)
    }

    getSubscribe(){
        return this._observers
    }

    unsubscribe (id) {
        this._observers = _.filter(this._observers,subscriber => String(subscriber._id) !== id)
    }

    updateSubscribe (id) {
        _.forEach(this._observers, (subscriber) => {
            if(String(subscriber._id) === id){
                 subscriber.updateProperties()
            }
        })

    }

}

module.exports = EventObserver




