class MethodRequest {

    getParamMethod(method, params) {

        let data = {}
        data.jsonrpc = 2.0
        data.method = method
        data.id = 1
        data.auth = null
        data.params = {}

        switch (method) {
            case "apiinfo.version":
                return data
            case "user.login":
                data.params.user = params.user
                data.params.password = params.password
                return data
            case "host.get":
                data.auth = params.token
                data.params.output = ["hostid", "host"]
                data.params.selectInterfaces = ["interfaceid", "ip"]
                return data

            default:
                return "don't get method"
        }
    }

}

module.exports =  MethodRequest

//const method = new MethodRequest("apiinfo.version").getParamMethod()
//console.log(method)