//const control_Zabbix = require('../controllers/controller_Zabbix')
const CryptoJS = require("crypto-js");
const routeArr = []



    let optionsRout = {}
    optionsRout.method = 'POST'
    optionsRout.path = '/'
    optionsRout.handler = (request, h) => {

       console.log(CryptoJS.sha1("Message", process.env.S_KEY)); //TODO исправить проблему с криптографией

        return request.payload
    }

routeArr.push(optionsRout)




module.exports = routeArr