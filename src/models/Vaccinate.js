const mongoose = require('mongoose')

const VaccinateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    petId: {
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    vaccinationDate: {
        type: String,
        required: false
    },
    returningDate: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

mongoose.model("Vaccinate", VaccinateSchema)