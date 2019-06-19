const CallZabbixAPI = require('../CallZabbixAPI')
const SettingRequest = require('./SettingRequest')

class History {
    constructor(url, token) {

        this.url = url
        this.token = token
        this.method = "history.get"
        this.history = null
    }

    //Получение всех хостов
    async call(params) {
        let sr = new SettingRequest().setParams(this.method, this.token, params)

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
    let hisroty = await new History(url, token)
    await hisroty.call(params)
    return {
        getZabbixHistory: await hisroty.getHistory()
    }
}

module.exports = GetHistory