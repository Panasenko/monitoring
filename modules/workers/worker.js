const _ = require('lodash')
const ZabbixAPI = require('../zabbix/zabbixAPI')


class Worker {
    constructor(args) {
        this._id = args._id
        this._name = args.name
        this._description = args.description
        this._url = args.url
        this._token = args.token
        this._intervalTime = args.intervalTime || 10000
        this._inProgress = args.inProgress || false
        this._lastTime = args.lastTime || null
        this._isError = false
        this._timerID = null
        this._status = false
    }

    get name() {
        return this._name
    }

    set name(value) {
        this._name = value
    }

    get description() {
        return this._description
    }

    set description(value) {
        this._description = value
    }

    get url() {
        return this._url
    }

    set url(value) {
        this._url = value
    }

    get token() {
        return this._token
    }

    set token(value) {
        this._token = value
    }

    get inProgress() {
        return this._inProgress
    }

    set inProgress(value) {
        this._inProgress = value
    }

    get status() {
        return this._status
    }

    set status(value) {
        this._status = value
    }

    get timerID() {
        return this._timerID
    }

    set timerID(value) {
        this._timerID = value
    }

    get lastTime() {
        return this._lastTime
    }

    set lastTime(value) {
        this._lastTime = value
    }

    get intervalTime() {
        return this._intervalTime
    }

    set intervalTime(value) {
        this._intervalTime = value
    }

    get isError() {
        return this._isError
    }

    set isError(value) {
        this._isError = value
    }

    changer(data) {
        _.forEach(data, (value, key) => {
            switch (key) {
                case "name": this.name = value
                    break
                case "description": this.description = value
                    break
                case "token": this.token = value
                    break
                case "url": this.url = value
                    break
                case "inProgress": this.inProgress = value
                    break
                case "intervalTime": this.intervalTime = value
                    break
            }
        })
    }
}

module.exports = Worker