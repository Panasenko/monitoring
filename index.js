require('dotenv').config()
require('./app/database/MongoDB')
const Hapi = require('hapi')
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi')
const schema = require('./app/graphql/schems')

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST
    })


    await server.register({
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                schema: schema,
            },
            route: {
                cors: true,
            },
        },
    })

    await server.register({
        plugin: graphiqlHapi,
        options: {
            path: '/graphiql',
            route: {
                cors: true,
            },
            graphiqlOptions: {
                endpointURL: 'graphql',
            },
        },
    })


    try {
        await server.start()
    } catch (err) {
        console.log(`Error while starting server: ${err.message}`)
    }

    console.log(`Server running at: ${server.info.uri}`)
}


process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
})

init()

