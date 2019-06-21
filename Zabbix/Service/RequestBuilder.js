class RequestBuilder {

    constructor(params) {
        this._params = null
    }

    get params() {
        if (this._params === null) {
            throw new Error('Method \"params\" in  class RequestBuilder is null ')
        }
        return this._params
    }

    set params(value) {
        this._params = value
    }

    build(method, token, params) {
        if (method === undefined|| params === undefined) {
            throw new Error("The parameter \"method\" or \"params\" is undefined.")
        }

        this._params = {
            method: method,
            auth: token,
            params: params,
            jsonrpc: 2.0,
            id: 1 //TODO написать динамически изменяемую функцию
        }
        return this._params
    }
}

module.exports = RequestBuilder
