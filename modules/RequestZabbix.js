const axios = require('axios')
const MethodRequest = require("./MethodRequest")

class RequestZabbix {
    constructor(zURL) {
        this.zURL = zURL
        this.token
        this.hosts
    }
//Получение версии забикаса
    async zabbixVersion() {
        let methodBody = await new MethodRequest().getParamMethod("apiinfo.version")
        return await this.callZabbixAPI( this.zURL, methodBody )
    }
//Авторизация в Zabbix, получение токена
    async login(user, password) {

        if(user === undefined || password === undefined) {
            throw new Error('Login and password are not transferred')
        }

        let params = {}
        params.user = user
        params.password = password

        return await this.callZabbixAPI( this.zURL, new MethodRequest().getParamMethod("user.login", params) )
    }
//Получаем массив хостов мониторинга zabbix
    async allHosts(){
        if(this.token === undefined) {
            throw new Error('No token passed to getHost function')
        }
        let params = {}
        params.token = this.token
        let hosts = await this.callZabbixAPI( this.zURL, new MethodRequest().getParamMethod("host.get", params ) )
        this.hosts = hosts
        return this.hosts
    }


//Возвращает токен
    getToken() {
        if(this.token === undefined) {
            throw new Error('no token')
        }
        return this.token
    }
//Возвращает список хостов
    getHosts() {
        if(this.hosts === undefined) {
            throw new Error('no hosts')
        }
        return this.hosts
    }
//Метод вызова API Zabbix
    async callZabbixAPI( zURL, data ) {
        const ax = axios.default.create({
            baseURL: zURL,
            headers: {
                Accept: 'application/json',
            },
            timeout: 40000,
            retries: 0,
        })

        try {
            const response = await ax.post( zURL, data )
            let token = await response.data.result
            if(token === undefined){
                throw new Error('Incorrect service response, token missing')
            }
            this.token =  await response.data.result
            return response.data.result
        } catch ( error ) {
            console.error( error )
        }
    }
}



async function main() {
    const Zabbix = new RequestZabbix('http://192.168.0.103/zabbix/api_jsonrpc.php')
    let data = await Zabbix.login('Admin', 'zabbix')
    await Zabbix.allHosts()


console.log(Zabbix.getHosts())

}

main()