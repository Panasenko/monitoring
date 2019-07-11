const RootQuery = `
  type Query {
    zabbixCliFindById(_id: String!): ZabbixCli
    
    token(url: String!, user: String!, password: String!): Token
    version(url: String!): [Version]
    hosts(url: String, token: String): [Hosts]
    hostgroup(url: String, token: String): [Hostgroup]
    applications(url: String, token: String): [Applications]
    graphics(url: String, token: String): [Graphics]
    items(url: String, token: String): [Items]
  }  
  
  type ZabbixCli {
    name: String, 
    description: String, 
    url: String, 
    token: String,
    _id: String,
    inProgress: Boolean, 
    lastTime: String,
    error: [String], 
    isError: Boolean,
    items: [String]
  }
  
  type Hosts {
    hostid: String,
    host: String,
    name: String,
    description: String,
    status: String,    
    applications(url: String, token: String): [Applications]
    graphics(url: String, token: String): [Graphics]
    items(url: String, token: String): [Items]
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
    description: String,
    key_: String,
    lastclock: String,
    lastns: String,
    lastvalue: String,
    prevvalue: String,
    applications: [Applications],
    graphs: [Graphics]
  }
`

const RootMutation = `
  type Mutation {
    createZabbixCli(input: ZabbixCliInput): ZabbixCli
    updateZabbixCli(_id: String!, input: ZabbixCliInput): ZabbixCli
    deleteZabbixCli(_id: String!): ZabbixCli
    
    createSubdocItemsZabbixCli(_id: String!, input: SubdocItemsZabbixCliInput): SubdocItemsZabbixCli
    deleteSubdocItemsZabbixCli(_id: String!, child_id: String!): SubdocItemsZabbixCli
  }
  
  input ZabbixCliInput{
    name: String, 
    description: String, 
    url: String, 
    token: String,
    _id: String,
    inProgress: Boolean, 
    lastTime: String,
    error: [String], 
    isError: Boolean
  }
  
  input SubdocItemsZabbixCliInput {
    itemid: String,
    hostid: String,
    name: String,
    description: String
  }
  
  type SubdocItemsZabbixCli {
    _id: String,
    itemid: String,
    hostid: String,
    name: String,
    description: String
  }


`


module.exports = [RootQuery, RootMutation]