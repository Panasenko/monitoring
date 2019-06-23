const mongoose = require('mongoose')
const Model_AZ = mongoose.model('AuthZabbix')
const v = require('validator')
const _ = require('Lodash')
const zabbixAPI = require('./../modules/Zabbix/ZabbixAPI')


let sendJSONresponse = (res, status, content) => {
    res.status(status)
    res.json(content)
}

module.exports.getVersionZabbix = async (req, res) => {

    if (!v.isURL(req.body.url)) {
        return sendJSONresponse(res, 400, {massage: "Required URL parameter not passed"})
    }
    let zabbix = await zabbixAPI(req.body.url)
    return sendJSONresponse(res, 200, await zabbix.getVersion)
}

module.exports.authenticate = async (req, res) => {

    if (!v.isURL(req.body.url)) {
        return sendJSONresponse(res, 400, {massage: "Required URL parameter not passed"})
    }

    if (v.isEmpty(req.body.user) || v.isEmpty(req.body.user)) {
        return sendJSONresponse(res, 400, {massage: "Login or password is empty"})
    }

    let params = {
        user: req.body.user,
        password: req.body.password
    }


    let zabbix = await zabbixAPI(req.body.url, params)
    let token = await zabbix.auth


    const dataModel = await new Model_AZ({
        "name": req.body.name,
        "discription": req.body.discription,
        "url": req.body.url,
        "token": token
    })

    await dataModel.save()
        .then((data) => sendJSONresponse(res, 200, data))
        .catch((err) => {
            sendJSONresponse(res, 500, {massage: "Internal Server Error"})
            return new Error(`Error added in database - ${err}`)
        })
}

