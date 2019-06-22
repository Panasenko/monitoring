'use strict'

const CallAPI = require("../Service/CallAPI")
const Errors = require("../Service/Errors")

class MainMethod extends Errors{
    constructor(url, token) {
        super()
        this._url = url
        this._token = token
    }

    get token() {
        Errors.valid(this._token, this.constructor.name, "get token")
        return this._token
    }

    set token(value) {
        this._token = value
    }

    get url() {
        Errors.valid(this._token, this.constructor.name, "get token")
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async callAPI(url, method, token, params) {
        let new_Obj = new CallAPI(url)
        let result = await new_Obj.call(method, token, params)
        return await result.data.result
    }

}

module.exports = MainMethod
