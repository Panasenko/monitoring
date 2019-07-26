const Observer = require('./observer')
const HistoryGet = require('./historyGet')

class Controller {
    constructor(){
        this.observer = new Observer()
    }

    addWorkers(){

        let dataquery =   {
            _id : "5d2796a85ea2b0297c89c45e",
            inProgress : false,
            name : "zabbix Host",
            description : "Экземпляр zabbix на локальной машине",
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

        this.observer.subscribe(new HistoryGet(dataquery))
    }

    updateProperties(id, data){
        this.observer.update(id, data)
    }
}


let cont = new Controller()

cont.addWorkers()
cont.updateProperties("5d2796a85ea2b0297c89c45e", {inProgress : true})

setTimeout(()=> {
    console.log(`stop - ${new Date()}`)
    cont.updateProperties("5d2796a85ea2b0297c89c45e", {inProgress : false})
}, 50000)

setTimeout(()=> {
    console.log(`start agane - ${new Date()}`)
    cont.updateProperties("5d2796a85ea2b0297c89c45e", {inProgress : true})
}, 80000)