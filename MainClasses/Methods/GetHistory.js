const CallZabbixAPI = require('../CallZabbixAPI')

class History {
    constructor(url, token, itemids) {

        this.url = url
        this.token = token
        this.itemids = itemids
        this.method = "history.get"
        this.history = null
        this.requestBody = {}
    }

    builderRequestBody(token, itemids) {
        let data = {}
        data.output = "extend"
        data.itemids = itemids
        data.history = 0
        data.sortfield = "clock"
        data.sortorder = "DESC"
        data.limit = 10

        this.requestBody.jsonrpc = 2.0
        this.requestBody.method = this.method
        this.requestBody.id = 1
        this.requestBody.auth = (token !== undefined) ? token : null
        this.requestBody.params = data //TODO Написать динамическое изменение параметров для передачи настроек выборки

        return this.requestBody
    }

    //Получение всех хостов
    async call() {
        let newobj = new CallZabbixAPI(this.url, this.builderRequestBody(this.token, this.itemids)) //TODO переработкать проверку переданного токена
        let result = await newobj.call() //TODO сделать проверку возврата функции
        this.history = result.data.result
    }

    getHistory() {
        if (this.history.length > 0) {
            return this.history
        }
        throw new Error('Items are not found')
    }
}

async function GetHistory(url, token, hostids) {
    let hisroty = await new History(url, token, hostids)
    await hisroty.call()
    return {
        getZabbixHistory: await hisroty.getHistory()
    }
}

module.exports = GetHistory