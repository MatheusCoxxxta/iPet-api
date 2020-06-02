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

    /**
     * Envio de imagens (update)
    */

    async updateImage(req, res) {
        const { originalname: imgName, size, key, location: imgUrl = '' } = req.file;

        try {
            const image = await Pet.findByIdAndUpdate(req.params.id, {
                imgName,
                size,
                key,
                imgUrl
            },{ new: true })

            return res.json({ image })
        } catch (error) {
            return res.json({ message: 'Ocorreu um erro ao tentar salvar a imagem...' })
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