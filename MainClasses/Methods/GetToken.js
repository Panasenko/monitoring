const CallZabbixAPI = require('../CallZabbixAPI')

class GetT {
    constructor ( url, user, pass) {

        this.url = url
        this.token = null
        this.user = user
        this.pass = pass
        this.requestBody = {}
    }

    builderRequestBody(user, password){
        this.requestBody.jsonrpc = 2.0
        this.requestBody.method = "user.login"
        this.requestBody.id = 1
        this.requestBody.auth = ( this.token !== undefined ) ? this.token : null
        this.requestBody.params = ( user !== undefined && password !== undefined ) ? { user, password } : new Error('Login or password is undefined')
        return this.requestBody
    }

    //Получение версии забикаса
    async login() {
        let newobj = new CallZabbixAPI(this.url, this.builderRequestBody(this.user, this.pass))
        let result = await newobj.call()
        return this.token = result.data.result
    }

    getToken() {
        if(this.token !== null) {
            return this.token
        }
        throw new Error('Error getting token. Parameter token is undefined')
    }
}


async function GetToken(url, user, password){
    let GT = await new GetT(url, user, password)
    await GT.login()
    return {
        getTokenAuth: await GT.getToken()
    }
}


module.exports = GetToken
