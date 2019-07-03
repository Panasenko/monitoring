const mongoose = require('mongoose')
const ModelAurh = mongoose.model('AuthZabbix')
const CryptoJS = require("crypto-js")
const v = require('validator')
const _ = require('Lodash')
const zabbixAPI = require('../../../../src/modules/Zabbix/ZabbixAPI')


function createHash(data) {
    let sign = CryptoJS.SHA256(JSON.stringify(data), process.env.S_KEY)
    return sign.toString(CryptoJS.enc.Hex)
}

module.exports.getVersionZabbix = async (req, res) => {
    try {
        let z = await new zabbixAPI(req.payload.url)
        res.response(await z.getVersion({})).code(200)
    } catch (e) {
        return res.response(e).code(500)
    }
}


module.exports.authenticate = async (req, res) => {

    let z = await new zabbixAPI(req.payload.url)
    let token = await z.login(
        {
            user: req.payload.user,
            password: req.payload.password
        })

    if (token) {
        const hash = createHash({
            user: req.payload.user,
            password: req.payload.password,
            url: req.payload.url
        })

        let data = ModelAurh.findOne({"hash": hash})

        if (_.isNull(await data)) {
            try {
                let newUser = new ModelAurh({
                    "name": req.payload.name,
                    "discription": req.payload.discription,
                    "url": req.payload.url,
                    "token": token,
                    "hash": hash
                })

                let savedData = await newUser.save()
                return res.response(savedData).code(200)
            } catch (e) {
                return res.response(e).code(500)
            }
        } else {
            return res.response(await data).code(200)

        }
    } else {
        return res.response("Unauthorized in zabbix").code(401)
    }
    throw new Error("Почему-то нихрена не сработало")


}


