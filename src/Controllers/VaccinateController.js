const mongoose = require('mongoose')

const Vaccinate = mongoose.model('Vaccinate')


module.exports = {
    async index (req, res) {
        const vaccines = await Vaccinate.find().sort({ 'createdAt': -1 })

        return res.json(vaccines)
    },

    async show (req, res) {
        const vaccine = await Vaccinate.findById(req.params.id)

        return res.json(vaccine)
    },

    async findByPet (req, res) {
        const vaccine = await Vaccinate.find({ 'petId': req.params.pet }).sort({ 'createdAt': -1 })

        return res.json(vaccine)
    },

    async store (req, res) {
        const { name, petId, petName, vaccinationDate, returningDate } = req.body;
        
        try {
            const vaccine = await Vaccinate.create({
                name,
                petId,
                petName,
                vaccinationDate,
                returningDate
            })

            return res.json(vaccine)
        } catch (error) {
            return res.json(error)
        }
        
    },

    async destroy (req, res) {
        try {
            const vaccine = await Vaccinate.findByIdAndRemove(req.params.id)

            return res.json({ message: "Success" })
        } catch (error) {
            return res.json(error)
        }

    }
}