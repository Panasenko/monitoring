class SettingRequest{

    constructor(){
        this.setRequest = {}
    }

    setParams(method, token, params) {

        this.setRequest = {
            method: method,
            auth: token,
            params: params,
            jsonrpc: 2.0,
            id: 1 //TODO Посмотреть что это за параметр
        }

        if(method === undefined || method === null ) {
            throw new Error("The parameter \"method\" is not passed.")
        }

        return this.setRequest
    }


    getParams() {
        return this.setRequest
    }

}

module.exports = SettingRequest
