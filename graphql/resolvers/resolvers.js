const _ = require('lodash')
const importQuery = require('./Query')
const importMutatuion = require('./Mutation')
const importHosts = require('./Hosts')


class Resolvers{
    static getResolvers(){
        return {
            Query: importQuery,
            Mutation: importMutatuion,
            Hosts: importHosts
        }
    }
}

module.exports = Resolvers.getResolvers()