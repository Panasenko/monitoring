const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')

class Items {
    constructor(url, token) {

        this.url = url
        this.token = token
        this.method = "item.get"
        this.items = null
    }

    //Получение всех хостов
    async call(params) {
        let sr = new SettingRequest().setParams(this.method, this.token, params)

        let newobj = new CallZabbixAPI(this.url, sr)
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

async function GetItems(url, token, params) {
    let items = await new Items(url, token)
    await items.call(params)
    return {
        getZabbixItems: await items.getItems()
    }
}

module.exports = GetItems