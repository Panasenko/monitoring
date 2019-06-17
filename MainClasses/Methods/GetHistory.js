const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')

class History {
    constructor(url, token, params) {

        this.url = url
        this.token = token
        this.method = "history.get"
        this.history = null
        this.params = params
    }

    //Получение всех хостов
    async call() {
        let sr = new SettingRequest().setParams(this.method, this.token, this.params)

        let newobj = new CallZabbixAPI(this.url, sr)
        let result = await newobj.call() //TODO сделать проверку возврата функции
        this.history = result.data.result
    }

    getHistory() {
        if (this.history.length > 0) {
            return this.history
        }
        throw new Error('History are not found')
    }
}

async function GetHistory(url, token, params) {
    let hisroty = await new History(url, token, params)
    await hisroty.call()
    return {
        getZabbixHistory: await hisroty.getHistory()
    }
}

module.exports = GetHistory