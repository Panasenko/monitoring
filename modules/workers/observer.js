const _ = require('lodash')

class EventObserver {
    constructor () {
        this._observers = []
    }

    get observer(){
        return this._observers
    }

    set observer(value){
        if(!_.some(this.observers, value._id)){
            this.observers.push(value)
        } else {
            throw new Error("Данный объект уже существует в подписчиках")
        }
    }

    subscribe (fn) {
        this.observers = fn
    }

    unsubscribe (id) {
        this.observers = this.observers.filter(subscriber => subscriber._id !== id)
        console.log(this.observers)
    }

    updateSubscribe (id, data) {
        this.observers.forEach(subscriber => {
            if(subscriber._id === id){
                subscriber.changer(data)
            }
        })
    }

    createItemsSubscribe (id, items) {
        this.observers.forEach(subscriber => {
            if(subscriber._id === id){
                subscriber.addItems(items)
            }
        })
    }

    deleteItemsSubscribe (id, itemsId) {
        this.observers.forEach(subscriber => {
            if(subscriber._id === id){
                subscriber.deleteItems(itemsId)
            }
        })
    }
}

module.exports = EventObserver




