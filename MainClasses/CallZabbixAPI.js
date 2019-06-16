const axios = require('axios')

class CallZabbixAPI {
    constructor (url, dataRequest) {
        this.url = url
        this.dataRequest = dataRequest
    }

//Метод вызова API Zabbix
    async call() {
        try {
            const result = await axios({
                baseURL: this.url,
                method: 'post',
                headers: {
                    Accept: 'application/json',
                },
                data: this.dataRequest,
                timeout: 40000,
                retries: 0
            })
              return result
        } catch ( error ) {
            console.error( error )
        }
    }
}

module.exports = CallZabbixAPI


/*

async function main () {
    const api = new CallZabbixAPI('http://192.168.0.103/zabbix/api_jsonrpc.php', {"jsonrpc":"2.0","method":"apiinfo.version","id":1,"auth":null,"params":{}})
    let result = await api.call()
    console.log(result)
}

main()*/
