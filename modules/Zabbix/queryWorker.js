const _ = require('lodash')
const ZabbixAPI = require('./zabbixAPI')


class QueryWorker {
    constructor(args) {
        this._zabbixCli_id = args.zabbixCli_id
        this._name = args.name
        this._description = args.description
        this._url = args.url
        this._token = args.token
        this._inProgress = args.inProgress || false
        this._lastTime = args.lastTime || null
        this._error = []
        this._isError = false
        this._items = args.items
        this._timerID = null

        this.pollHistory()
    }

    get timerID() {
        return this._timerID
    }

    set timerID(value) {
        this._timerID = value
    }

    get items() {
        return this._items
    }

    set items(value) {
        this._items = value
    }

    get lastTime() {
        return this._lastTime
    }

    set lastTime(value) {
        this._lastTime = value
    }


    parsItems(items) {
        if (_.every(items, value => _.isObject(value))) {
            return _.reduce(items, function (accumulator, value) {
                accumulator.push(value.itemid)
                return accumulator
            }, [])
        } else if (_.every(items, value => _.isString(value))) {
            return items
        } else {
            throw new Error('function parsItems - incorrect params')
        }
    }

     pollHistory() { //TODO: закончить метод
        this.timerID = setInterval(async () => {
            if(this._inProgress){

                let reqParams = {
                    itemids: this.parsItems(this.items),
                    time_from: this.lastTime || (Date.now() / 1000 | 0) - 160
                }

                let res = await ZabbixAPI.getHistory(this._url, this._token, reqParams)


                console.log(res.length)


                if(this.lastTime !== res[0].clock){
                    this.lastTime = res[0].clock
                    console.log(res)
                }




            }


        }, 1000)


    }


}

let data =   {
    zabbixCli_id : "5d2796a85ea2b0297c89c45e",
    inProgress : true,
    name : "Zabbix Host",
    description : "Экземпляр Zabbix на локальной машине",
    url : "http://192.168.0.103/zabbix/api_jsonrpc.php",
    token : "b1a13284396c5c2030dce37993375561",
    items : [{
        _id : {
            "$oid" : "5d35fa0c940e50213c1e4b5e"
        },
        itemid : "23296",
        hostid : "10084",
        name : "Processor load (1 min average per core)",
        description : null
    }, {
        _id : {
            "$oid" : "5d35fa980167c30044377bce"
        },
        itemid : "23297",
        hostid : "10084",
        name : "Processor load (5 min average per core)",
        description: null
    }, {
        _id : {
            "$oid" : "5d35faf04f6aaf2a2cbc0440"
        },
        itemid : "23298",
        hostid : "10084",
        name : "Context switches per second",
        description : null
    }],
    "__v" : 19
}

 new QueryWorker(data)
