const RootQuery = `
  type Query {
    zabbixCli(url: String!): ZabbixCli
    
    getItems(zabbixCli_id: String!): [GetItems]
    getItem(itemid: String!): GetItems
    
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
    _id: String
  }
  
  type GetItems{
    zabbixCli_id: String,
    description: String, 
    hostid: String, 
    itemid: String,
    inProgress: String, 
    name: String,
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
    createZabbixCli(name: String!, description: String!, url: String!, token: String!): ZabbixCliMutation
    updateZabbixCli(name: String!, description: String!, url: String!, token: String!): ZabbixCliMutation
    deleteZabbixCli(_id: String!): ZabbixCliMutation
    
    createItem(zabbixCli_id: String!, name: String!, hostid: String!, itemid: String!, description: String, inProgress: Boolean): ItemMutation
    updateItem(zabbixCli_id: String!, name: String!, hostid: String!, itemid: String!, description: String, inProgress: Boolean): ItemMutation
    deleteItem(zabbixCli_id: String, name: String, hostid: String, itemid: String, description: String, inProgress: Boolean): ItemMutation
    
  }
  
  type ZabbixCliMutation {
    name: String!
    description: String!, 
    url: String!, 
    token: String!
}

  type ItemMutation {
    zabbixCli_id: String!
    name: String!, 
    hostid: String!, 
    itemid: String!,
    description: String, 
    inProgress: Boolean
  } 

`


module.exports = [RootQuery, RootMutation]