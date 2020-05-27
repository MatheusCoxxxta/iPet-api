const mongoose = require('mongoose')

const User = mongoose.model('User')


module.exports = {
    async index (req, res) {
        const user = await User.find().sort({ 'createdAt': -1 })

        return res.json(user)
    },

    async show (req, res) {
        const user = await User.findById(req.params.id)

        return res.json(user)
    },

    async destroy (req, res) {
        try {
            const user = await User.findByIdAndRemove(req.params.id)

            return res.json({ message: "Success" })
        } catch (error) {
            return res.json(error)
        }

    }
}