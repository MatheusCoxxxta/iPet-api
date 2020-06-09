const mongoose = require('mongoose')

const VermifugeSchema = new mongoose.Schema({
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
    vermifugationDate: {
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

mongoose.model("Vermifuge", VermifugeSchema)