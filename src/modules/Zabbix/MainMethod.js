'use strict'

const CallAPI = require("./CallAPI")
const Errors = require("./Errors")

class MainMethod {
    constructor(url, token) {
        this._url = url
        this._token = token
        this._version = null
        this._hosts = null
        this._hostGroup = null
        this._items = null
        this._history = null
        this._graphs = null
        this._application = null
        this._graphitem = null
    }

    get graphitem() {
        Errors.valid(this._graphitem, this.constructor.name, "get graphitem")
        return this._graphitem
    }

    set graphitem(value) {
        this._graphitem = value
    }

    get application() {
        Errors.valid(this._application, this.constructor.name, "get application")
        return this._application
    }

    set application(value) {
        this._application = value
    }

    get token() {
        //  Errors.valid(this._token, this.constructor.name, "get token")
        return this._token
    }

    set token(value) {
        this._token = value
    }

    get url() {
        Errors.valid(this._url, this.constructor.name, "get url")
        return this._url
    }

    set url(value) {
        this._url = value
    }

    get version() {
        Errors.valid(this._version, this.constructor.name, "version")
        return this._version
    }

    set version(value) {
        this._version = value
    }

    get hosts() {
        Errors.valid(this._hosts, this.constructor.name, "get host")
        return this._hosts
    }

    set hosts(value) {
        this._hosts = value
    }

    get hostGroup() {
        Errors.valid(this._hostGroup, this.constructor.name, "get hostGroup")
        return this._hostGroup
    }

    set hostGroup(value) {
        this._hostGroup = value
    }

    get items() {
        Errors.valid(this._items, this.constructor.name, "get items")
        return this._items
    }

    set items(value) {
        this._items = value
    }

    get history() {
        Errors.valid(this._history, this.constructor.name, "get history")
        return this._history
    }

    set history(value) {
        this._history = value
    }

    get graphs() {
        Errors.valid(this._graphs, this.constructor.name, "get graphs")
        return this._graphs
    }

    set graphs(value) {
        this._graphs = value
    }


    async callAPI(url, token, method,  params) {
        let new_Obj = new CallAPI(url)
        let result = await new_Obj.call(method, token, params)
        return await result.data.result
    }
}

module.exports = MainMethod
