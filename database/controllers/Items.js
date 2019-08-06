const mongoose = require('mongoose')
const Items = mongoose.model('Items')

class ItemsDB {
    static async find(params) {
        try {
            return await Items.find(params).populate('items')
        } catch (e) {
            throw new Error(e)
        }
    }

    static async findById(id){
        try {
            return await Items.findById(id).populate('items')
        } catch (e) {
            throw new Error(e)
        }
    }

    static async create(params){
        try {
            return await Items.create(params)
        } catch (e) {
            throw new Error(e)
        }
    }

    static async findByIdAndUpdate(id,input){
        try {
            return await Items.findByIdAndUpdate(id, input, {new: true})
        } catch (e) {
            throw new Error(e)
        }
    }

    static async findByIdAndRemove(id){
        try {
            return await Items.findByIdAndRemove(id)
        } catch (e) {
            throw new Error(e)
        }
    }

    static async deleteMany(params){
        try {
            return await Items.deleteMany(params)
        } catch (e) {
            throw new Error(e)
        }
    }

}

module.exports = ItemsDB