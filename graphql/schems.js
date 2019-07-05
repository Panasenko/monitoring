const RootQuery = `
  type Query {
    allZabbix(url: String!): AllZabbix
    token(url: String!, user: String!, password: String!): Token
    version(url: String!): [Version]
    hosts(url: String!, token: String!): [Hosts]
    applications(url: String!, token: String!, hostid: String!): [Applications]
  }  
  
  type AllZabbix {
    name: String, 
    discription: String, 
    url: String, 
    token: String,
    version(url: String): Version,
    hosts(url: String, token: String): [Hosts]
  }

  type Token {
    token: String
  }
    
  type Version {
    version: String
  }
        
  type Hosts {
    hostid: String,
    host: String,
    applications(url: String, token: String, hostid: String): [Applications]
  } 
  
  type Applications {
    applicationid: String,
    hostid: String,
    name: String
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