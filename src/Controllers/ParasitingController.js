const mongoose = require('mongoose')

const Parasiting = mongoose.model('Parasiting')


module.exports = {
    async index (req, res) {
        const parasiting = await Parasiting.find().sort({ 'createdAt': -1 })

        return res.json(parasiting)
    },

    async show (req, res) {
        const parasiting = await Parasiting.findById(req.params.id)

        return res.json(parasiting)
    },

    async findByPet (req, res) {
        const parasiting = await Parasiting.find({ 'petId': req.params.pet }).sort({ 'createdAt': -1 })

        return res.json(parasiting)
    },

    async store (req, res) {
        const { name, petId, petName, parasitingDate, returningDate } = req.body;
        
        try {
            const parasiting = await Parasiting.create({
                name,
                petId,
                petName,
                parasitingDate,
                returningDate
            })

            return res.json(parasiting)
        } catch (error) {
            return res.json(error)
        }
        
    },

    async destroy (req, res) {
        try {
            const parasiting = await Parasiting.findByIdAndRemove(req.params.id)

            return res.json({ message: "Success" })
        } catch (error) {
            return res.json(error)
        }

    }
}