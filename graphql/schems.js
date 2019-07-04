const RootQuery = `
  type Query {
    allZabbix(url: String!): AllZabbix
    token(url: String!, user: String!, password: String!): Token
    version(url: String!): Version
    versions(url: String): Version
    hosts(url: String!, token: String!): [Hosts]
  }  
  
  type AllZabbix {
    name: String, 
    discription: String, 
    url: String, 
    token: String,
    versions(url: String): Version
  }

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

const RootMutation = `
  type Mutation {
    createZabbixCli(name: String!, discription: String!, url: String!, token: String!): CreateZabbixCli
  }
  
  type CreateZabbixCli {
    name: String!
    discription: String!, 
    url: String!, 
    token: String!
}

`


module.exports = [RootQuery, RootMutation]