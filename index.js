
const { GetVersion,  GetToken, GetHosts} = require("./MethodsClass/Methods")


async function main() {

    let test = new GetVersion('http://192.168.0.103/zabbix/api_jsonrpc.php')
    let test1 = await test.zabbixVersion()

    console.log(test1)



/*    const Zabbix = new RequestZabbix('http://192.168.0.103/zabbix/api_jsonrpc.php')
    let data = await Zabbix.login('Admin', 'zabbix')
    await Zabbix.allHosts()

    const Metods = new Methods('http://192.168.0.103/zabbix/api_jsonrpc.php')

    console.log(await Metods.zabbixVersion())*/

}

main()
