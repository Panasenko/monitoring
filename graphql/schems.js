const RootQuery = `
  type Query {
    zabbixCliFindById(_id: String!): ZabbixCli
    
    version(url: String!): Version
    token(url: String!, input: inputToken): Token    
    hosts(url: String, token: String): [Hosts]
    hostgroup(url: String, token: String): [Hostgroup]
    applications(url: String, token: String): [Applications]
    graphics(url: String, token: String): [Graphics]
    items(url: String, token: String): [Items]
  }  
  
  type Version {
    version: String
  } 
  
  type Token {
    token: String
  }
  
  input inputToken {
    user: String,
    password: String
  }
 
  
  type ZabbixCli {
    name: String, 
    description: String, 
    url: String, 
    token: String,
    _id: String,
    inProgress: Boolean, 
    lastTime: String,
    intervalTime: String,
    items: [Items]
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
    
    createItemsToZabbixCli(_id: String!, input: ItemsZabbixCliInput): ItemsZabbixCli
    updateItemsToZabbixCli(_id: String!, input: ItemsZabbixCliInput): ItemsZabbixCli
    deleteItemsToZabbixCli(_id: String!, child_id: String!): ItemsZabbixCli
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
  
  input ItemsZabbixCliInput {
    itemid: String,
    hostid: String,
    name: String,
    description: String,
    zabbixCliID: String
  }
  
  type ItemsZabbixCli {
    _id: String,
    itemid: String,
    hostid: String,
    name: String,
    description: String
  }


`


module.exports = [RootQuery, RootMutation]