let {
    GraphQLString,
    GraphQLObjectType
} = require('graphql');

const HostType = new GraphQLObjectType({
    name: "Host",
    description: "Get host Zabbix",
    fields: () => ({
        hostid: { type: GraphQLString},
        host: { type: GraphQLString}
    })
})

module.exports = HostType