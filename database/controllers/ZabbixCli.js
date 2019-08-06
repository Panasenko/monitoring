const mongoose = require('mongoose')
const ZabbixCli = mongoose.model('ZabbixCli')

class ZabbixCliDB {
    static async find(params) {
        try {
            return await ZabbixCli.find(params).populate('items')
        } catch (e) {
            throw new Error(e)
        }
    }

    static async findById(params){
        try {
            return await ZabbixCli.findById(params).populate('items')
        } catch (e) {
            throw new Error(e)
        }
    }

}

module.exports = ZabbixCliDB