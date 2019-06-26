require('dotenv').config()
require('./app/database/MongoDB')
const Hapi = require('hapi')

const routeZabbix = require('./app/plagins/zabbix/plagin_zabbix')

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST
    })
    await server.register(routeZabbix)

    await server.start()
    console.log('Server running on %s', server.info.uri)
}


process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
})

init()

