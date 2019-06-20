const CallAPI = require("./CallAPI")
const Token = require("./Token")


class Zabbix {
    constructor(url) {
        this._url = url
        this._token = null
    }

    async tokens() {
        if (this._token === null) {
            //throw new Error('Error getting token. Parameter token is null')

            let params = {
                user: "Admin",
                password: "zabbix"
            }


            let newToken = new Token(this._url, params)
            await newToken.token()

            console.log(this._token)
        }
        return this._token
    }

    set token(value) {
        this._token = value
    }

    get url() {
        if (this._url === null) {
            throw new Error('Error getting token. Parameter url is null')
        }
        return this._url
    }

    set url(value) {
        this._url = value
    }

    async callAPI(url, method, token, params) {
        let new_Obj = new CallAPI(url)
        let result = await new_Obj.call(url, method, token, params)
        return await result.data.result
    }

}

module.exports = Zabbix


async function main() {
     let zab = new Zabbix('http://192.168.0.101/zabbix/api_jsonrpc.php') //, 'Admin', 'zabbix'
    let res = await zab.tokens()
    console.log(res)
}

main()
