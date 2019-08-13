require('dotenv').config()
const Hapi = require('hapi')
const {ApolloServer} = require('apollo-server-hapi')
const { importSchema } = require('graphql-import')
require('./database/MongoDB')
require('./modules/workers/worker.init')

const resolvers = require('./graphql/resolvers/main.resolvers')
const typeDefs = importSchema('./graphql/schems/schema.graphql')

async function StartServer() {
    const server = new ApolloServer({typeDefs, resolvers})

    const app = new Hapi.server({
        port: process.env.PORT || 4000,
        host: process.env.HOST
    })

    await server.applyMiddleware({
        app
    })

    await app.start()

    console.log(`Server is run in port ${app.info.port}`)
}

StartServer().catch(error => console.log(error))