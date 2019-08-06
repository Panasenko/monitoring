const _ = require('lodash')
const HistoryGet = require('./historyGet')
const Controller = require('./controller')

let objects = []

let Factory = { //TODO: выпилить
    getController: (options) => {
        let foundObj = _.find(objects, options)
        if (_.isObject(foundObj)) {
            return foundObj
        } else {
            switch (options.typeObject) {
                case "HistoryGet":
                    let newObject = new Controller(HistoryGet)
                    newObject.typeObject = "HistoryGet"
                    objects.push(newObject)
                    return newObject
                default:
                    throw new Error("typeObject is not match")
            }
        }
    }
}

module.exports = Factory.getController
