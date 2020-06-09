const mongoose = require('mongoose')

const Vermifuge = mongoose.model('Vermifuge')


module.exports = {
    async index (req, res) {
        const vermifugations = await Vermifuge.find().sort({ 'createdAt': -1 })

        return res.json(vermifugations)
    },

    async show (req, res) {
        const vermifugation = await Vermifuge.findById(req.params.id)

        return res.json(vermifugation)
    },

    async findByPet (req, res) {
        const vermifugation = await Vermifuge.find({ 'petId': req.params.pet }).sort({ 'createdAt': -1 })

        return res.json(vermifugation)
    },

    async store (req, res) {
        const { name, petId, petName, vermifugationDate, returningDate } = req.body;
        
        try {
            const vermifugation = await Vermifuge.create({
                name,
                petId,
                petName,
                vermifugationDate,
                returningDate
            })

            return res.json(vermifugation)
        } catch (error) {
            return res.json(error)
        }
        
    },

    async destroy (req, res) {
        try {
            const vermifugation = await Vermifuge.findByIdAndRemove(req.params.id)

            return res.json({ message: "Success" })
        } catch (error) {
            return res.json(error)
        }

    }
}