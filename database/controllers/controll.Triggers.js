const mongoose = require('mongoose')
const Triggers = mongoose.model('Triggers')

class TriggersControll {

    static async create(args) {
        try {
            return await Triggers.create(args)
        } catch (e) {
            throw new Error(e)
        }
    }

    static async findByIdAndRemove(id) {
        try {
            return await Triggers.findByIdAndRemove(id)
        } catch (e) {
            throw new Error(e)
        }
    }

    static async deleteMany(args) {
        try {
            return await Triggers.deleteMany(args)
        } catch (e) {
            throw new Error(e)
        }
    }

}

module.exports = TriggersControll