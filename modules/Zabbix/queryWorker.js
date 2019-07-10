const axios = require('axios')
const _ = require('lodash')


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
        this._items = this.parsItems(args.items)
    }

    get items() {
        return this._items
    }

    parsItems(items) {
        if(_.every(items, value => _.isObject(value))){
            return _.reduce(items, function(accumulator, value) {
                accumulator.push(value.itemid)
                return accumulator
            }, [])
        } else if(_.every(items, value => _.isString(value))) {
            return items
        } else {
            throw new Error('function parsItems - incorrect params')
        }
    }

    
}

let items = [

    {
        "itemid": "28423",
        "name": "CPU guest time"
    },
    {
        "itemid": "283232",
        "name": "CPU guest time"
    }
]

let r = new QueryWorker({items})

console.log(r.items)