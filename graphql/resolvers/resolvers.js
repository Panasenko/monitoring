const _ = require('lodash')
const importQuery = require('./Query')
const importMutatuion = require('./Mutation')
const importHosts = require('./Hosts')


module.exports = {
    Query: importQuery,
    Mutation: importMutatuion,
    Hosts: importHosts
}
