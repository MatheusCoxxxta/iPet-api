const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()

const app = express()
const routes = require('./src/Routes')

mongoose.connect("mongodb+srv://iPet:iPet1234@ipet-s4u0w.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use('/api', routes)

app.listen(3001)

// Server 