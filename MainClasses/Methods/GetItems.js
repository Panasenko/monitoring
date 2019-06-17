const CallZabbixAPI = require('../CallZabbixAPI')

class Items {
    constructor(url, token, hostids) {

        this.url = url
        this.token = token
        this.hostids = hostids
        this.method = "item.get"
        this.items = null
        this.requestBody = {}
    }

    builderRequestBody(token, hostids) {
        let data = {}
        data.output = "extend"
        data.hostids = hostids
        data.search = {"key_": "system"}
        data.sortfield = "name"

        this.requestBody.jsonrpc = 2.0
        this.requestBody.method = this.method
        this.requestBody.id = 1
        this.requestBody.auth = (token !== undefined) ? token : null
        this.requestBody.params = data //TODO Написать динамическое изменение параметров для передачи настроек выборки

        return this.requestBody
    }

    //Получение всех хостов
    async call() {
        let newobj = new CallZabbixAPI(this.url, this.builderRequestBody(this.token, this.hostids)) //TODO переработкать проверку переданного токена
        let result = await newobj.call() //TODO сделать проверку возврата функции
        this.items = result.data.result
    }

    getItems() {
        if (this.items.length > 0) {
            return this.items
        }
        throw new Error('Items are not found')
    }
}

async function GetItems(url, token, hostids) {
    let items = await new Items(url, token, hostids)
    await items.call()
    return {
        getZabbixItems: await items.getItems()
    }
}

module.exports = GetItems