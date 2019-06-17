const { GetVersion,  GetToken, GetHosts} = require("./Methods/AllMethods")



 class ZabbixCli {
    constructor(url, user, pass){
        this.url = url
        this.user = user
        this.pass = pass
        this.token = null
        this.version = null
        this.hosts = null
    }

     async login() {
         let gt = await new GetToken(this.url, this.user, this.pass)
         this.token = await gt.login()
     }

     methods(){
        return {
            getVersion: async() => {
                let getV = await new GetVersion(this.url)
                return this.token = await getV.call()
            }

        }
     }



}



async function main() {
    let zabbix = await new ZabbixCli('http://192.168.0.103/zabbix/api_jsonrpc.php', 'Admin', 'zabbix')
    await zabbix.login()
    let test = await tesutl.methods().getVersion()
    console.log(test)


}

main()