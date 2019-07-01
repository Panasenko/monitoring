
let {
    GraphQLString,
    GraphQLObjectType
} = require('graphql');

const LoginType = new GraphQLObjectType({
    name: "Login",
    description: "Get token Zabbix",
    fields: () => ({
        token: { type: GraphQLString}
    })
})

module.exports = LoginType