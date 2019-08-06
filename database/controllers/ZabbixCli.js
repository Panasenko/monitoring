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

    static async findById(id){
        try {
            return await ZabbixCli.findById(id).populate('items')
        } catch (e) {
            throw new Error(e)
        }
    }

    static async create(params){
        try {
            return await ZabbixCli.create(params)
        } catch (e) {
            throw new Error(e)
        }
    }

    static async findByIdAndUpdate(id,input){
        try {
            return await ZabbixCli.findByIdAndUpdate(id, input, {new: true})
        } catch (e) {
            throw new Error(e)
        }
    }

    static async findByIdAndRemove(id){
        try {
            return await ZabbixCli.findByIdAndRemove(id)
        } catch (e) {
            throw new Error(e)
        }
    }

}

module.exports = ZabbixCliDB