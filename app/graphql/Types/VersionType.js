let {
    GraphQLString,
    GraphQLObjectType
} = require('graphql');

const VersionType = new GraphQLObjectType({
    name: "Version",
    description: "This version Zabbix",
    fields: () => ({
        version: { type: GraphQLString}
    })
})

module.exports = VersionType