require('dotenv').config()
const Hapi = require('hapi')
const routeZabbix = require('./app/routes/routes_Zabbix')

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST
    })

    server.route(routeZabbix)

    await server.start()
    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
})

init()

