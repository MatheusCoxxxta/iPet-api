const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

mongoose.model("User", UserSchema);