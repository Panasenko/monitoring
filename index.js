require('dotenv').config()
const Hapi = require('hapi')
const {ApolloServer, gql} = require('apollo-server-hapi')
require('./database/MongoDB')

const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/schems')

async function StartServer() {
    const server = new ApolloServer({typeDefs, resolvers})

    const app = new Hapi.server({
        port: process.env.PORT_HAPI || 4000,
        host: process.env.HOST
    })

    await server.applyMiddleware({
        app
    })

    await app.start()

    console.log(`Server is run in port ${app.info.port}`)
}

StartServer().catch(error => console.log(error))
