const mongoose = require('mongoose')
const Model_Aurh = mongoose.model('AuthZabbix')
const v = require('validator')
const _ = require('Lodash')
const crypto = require('crypto')
const zabbixAPI = require('./../modules/Zabbix/ZabbixAPI')
const config = require('../../config/config')


const sendJSONresponse = (res, status, content) => {
    res.status(status)
    res.json(content)
}

const createHash = (user, pass, url) => {

    let secret = config.skey
    let algorithm = 'sha1'

    let hmac = crypto.createHmac(algorithm, secret)
    hmac.update(`${user}${pass}${url}`)
    return hmac.digest('hex')
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

    const hash = createHash(req.body.user, req.body.password, req.body.url)

    Model_Aurh.findOne({"hash": hash}).exec(function (err, data) {

        if (err) {
            sendJSONresponse(res, 500, {massage: "Internal Server Error"})
            throw err
        }

        if (_.isNull(data)) {
            new Model_Aurh({
                "name": req.body.name,
                "discription": req.body.discription,
                "url": req.body.url,
                "token": token,
                "hash": hash
            })
                .save()
                .then((data) => sendJSONresponse(res, 200, data))
                .catch((err) => {
                    sendJSONresponse(res, 500, {massage: "Internal Server Error"})
                    return new Error(`Error added in database - ${err}`)
                })
        } else {
            return sendJSONresponse(res, 200, data)
        }


    })


}

