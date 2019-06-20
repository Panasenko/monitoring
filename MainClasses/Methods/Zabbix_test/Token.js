const Zabbix = require('./Zabbix')

class Token extends Zabbix {
    constructor(url, params) {
        super()
        this._token = null
        this.url = url
        this.params = params
        this.method = "user.login"
    }

    set token(value) {
        this._token = value
    }

    get token() {
  /*      if(this._token === null){
            return super.token =  this.token = await this.call()

            //return super.token =  this.token = await this.call()
            //return super.token = this.token
        }*/
        return this._token
    }

    async call() {
        this.token = await super.callAPI(this.url, this.method, this._token, this.params)
    }

}

module.exports = Token
