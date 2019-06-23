const mongoose = require('mongoose')
const v = require('validator')
const _ = require('Lodash')
const zabbixAPI = require('./../modules/Zabbix/ZabbixAPI')
//const TaskZabbix = mongoose.model('taskZabbixMonitoring')

let sendJSONresponse = (res, status, content) => {
    res.status(status)
    res.json(content)
}

module.exports.getVersionZabbix =  async (req, res) => {

    if(v.isURL(req.body.url)){
    let zabbix =  await zabbixAPI(req.body.url)
       return sendJSONresponse(res, 200, await zabbix.getVersion)
    }

    return sendJSONresponse(res, 400, {
        massage: "Required URL parameter not passed"
    })


}

/*
module.exports.auth =  async (req, res) => {
    let zabbix =  await zabbixAPI()
    sendJSONresponse(res, 200, await zabbix.getVersion)
}
*/





/*

;

module.exports.getZabbix = function(req, res) {
    Mon
        .find()
        .exec(function (err, zabbix) {
            if(!zabbix){
                sendJSONresponse(res, 404, {"massage": "Event not found"});
                return;
            } else if (err){
                sendJSONresponse(res, 404, err);
                return;
            }
            ;
        })
};

module.exports.setZabbix = function(req, res) {
    Mon.create({
        "platform": req.body.platform,
        "status": req.body.status,
        "duration": req.body.duration,
        "recoveryDate": req.body.recoveryDate,
        "groups": req.body.groups,
        "problem": req.body.problem,
        "ip": req.body.ip,
        "host": req.body.host,
        "eventId": req.body.eventId
    }, function (err, zabbix){
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 401, zabbix);
        }
    })
};

  */
