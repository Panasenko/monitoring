const mongoose = require('mongoose')
mongoose.connect('mongodb://192.168.0.104:27017/zabbix', {useNewUrlParser: true})
require('./../database/Models_ZabbixCli')

const ZabbixCl = mongoose.model('AuthZabbix')

let args = {
    "name": "Zabbix Host",
    "description": "Экземпляр Zabbix на локальной машине",
    "url": "http://192.168.0.101/zabbix/api_jsonrpc.php",
    "token": "b1a13284396c5c2030dce37993375561",
    "inProgress": false
}

let items = {
    zabbixCli_id: "5d239076e116311e6083180d",
    name: "CPU guest time",
    hostid: "10084",
    itemid: "28498",
    description: "The time spent running a virtual CPU for guest operating systems",
    inProgress: true
}

async function main() {
/*   let prom  =  ZabbixCl.create({
        "name": args.name,
        "description": args.description,
        "url": args.url,
        "token": args.token,
        "inProgress": args.inProgress || false,
        "lastTime": args.lastTime || null

    })


     let rr = await prom
    console.log(rr)
    return rr*/

/*, function (err, res) {
        res.items.push(items)
        return res.save()
    }*/

   let rr =  ZabbixCl.findOne({"_id": "5d24dbd1247894311431dc24"})
   let kj =

console.log(await rr.items)



}
let res = main()


