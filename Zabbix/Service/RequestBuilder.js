const Errors = require("./Errors")

class RequestBuilder extends Errors {

    static build(method, token, params) {
        Errors.valid(method, this.constructor.name, "build")

        if (method !== "apiinfo.version" && method !== "user.login") {
            Errors.valid(token, this.constructor.name, "build")
        }

        if (method !== "apiinfo.version") {
            Errors.valid(params, this.constructor.name, "build")
        }

        return {
            method: method,
            auth: token,
            params: params,
            jsonrpc: 2.0,
            id: 1 //TODO написать динамически изменяемую функцию
        }
    }
}

module.exports = RequestBuilder
