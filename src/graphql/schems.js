const RootQuery = `
  type Query {
    token(url: String!, user: String!, password: String!): Token
    version(url: String!): Version
    hosts(url: String!, token: String!): [Hosts]
  }
  
  type Mutation {
    createZabbixCli(url:String!): CreateZabbixCli
  }
`
const TypesQuery = `
type Token {
    token: String
}

type Version {
    version: String
  }
    
type Hosts {
     hostid: String,
     host: String
}  
`

const TypesMutation = `
type CreateZabbixCli {
    name: String,
    discription: String,
    zabbix_URL": String,
    token: String,
    id: ID
}

`

module.exports = [RootQuery, TypesQuery, TypesMutation]