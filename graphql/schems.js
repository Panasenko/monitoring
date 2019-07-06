const RootQuery = `
  type Query {
    zabbixCli(url: String!): ZabbixCli
    token(url: String!, user: String!, password: String!): Token
    version(url: String!): [Version]
    hosts(url: String, token: String): [Hosts]
    hostgroup(url: String, token: String): [Hostgroup]
    applications(url: String, token: String): [Applications]
    graphics(url: String, token: String): [Graphics]
  }  
  
  type ZabbixCli {
    name: String, 
    discription: String, 
    url: String, 
    token: String
  }
  
  type Hostgroup {
    groupid: String,
    name: String,
    hosts: [Hosts]
    
  }
  
  type Graphics{
    graphid: String,
    name: String,
    items: [Items]
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
    name: String,
    description: String,
    status: String,    
    applications(url: String, token: String): [Applications]
    graphics(url: String, token: String): [Graphics]
  } 
  
  type Applications {
    applicationid: String,
    hostid: String,
    name: String,
    items: [Items]
  }
  
  type Items {
    itemid: String,
    hostid: String,
    name: String,
    key_: String,
    lastclock: String,
    lastns: String,
    lastvalue: String,
    prevvalue: String
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