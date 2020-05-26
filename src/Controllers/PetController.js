const mongoose = require('mongoose')

const Pet = mongoose.model('Pet')


module.exports = {
    async index (req, res) {
        const pets = await Pet.find({ ownerId: req.params.ownerId }).sort({ 'createdAt': -1 })

        return res.json(pets)
    },

    async show (req, res) {
        const pet = await Pet.findById(req.params.id)

        return res.json(pet)
    },

    async store (req, res) {
        const { name, type, color, age, born, breed, castrationDate, owner, ownerId } = req.body;

        try {
            const pet = await Pet.create({
                name, 
                type, 
                color, 
                age, 
                born, 
                breed, 
                castrationDate,
                owner,
                ownerId
        })
            return res.json(pet)
        } catch (error) {
            return res.json(error)
        }
    },

    async update (req, res) {
        const { name, type, color, age, born, breed, castrationDate, owner, ownerId } = req.body;

        try {
            const pet = await Pet.findByIdAndUpdate(req.params.id, {
                name, 
                type, 
                color, 
                age, 
                born, 
                breed, 
                castrationDate,
                owner,
                ownerId
            }, { new: true })

            return res.json(pet)
        } catch (error) {
            return res.json(error)
        }

    },

    async destroy (req, res) {
        try {
            const pet = await Pet.findByIdAndRemove(req.params.id)

            return res.json({ message: "Success" })
        } catch (error) {
            return res.json(error)
        }

    }
}