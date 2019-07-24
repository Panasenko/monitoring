const QueryWorker = require('./queryWorker')

class EventObserver {
    constructor () {
        this.observers = []
    }

    subscribe (fn) {
        this.observers.push(fn)
    }

    unsubscribe (fn) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }

    broadcast (data) {
        this.observers.forEach(subscriber => subscriber(data))
    }

    changer (data) {
        this.observers.forEach(subscriber => {
            if(subscriber._zabbixCli_id === data.zabbixCli_id){
                subscriber.changer("hello world")
            }

        })
    }
}

let dataquery =   {
    zabbixCli_id : "5d2796a85ea2b0297c89c45e",
    inProgress : true,
    name : "Zabbix Host",
    description : "Экземпляр Zabbix на локальной машине",
    url : "http://192.168.0.101/zabbix/api_jsonrpc.php",
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
let data2 =   {
    zabbixCli_id : "5d2796rrrrrrrrrrrr5e",
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

let observ = new EventObserver()

observ.subscribe(new QueryWorker(dataquery))

let data = {
    zabbixCli_id: "5d2796a85ea2b0297c89c45e"
}

observ.changer(data)

//observ.subscribe(new QueryWorker(data2))




