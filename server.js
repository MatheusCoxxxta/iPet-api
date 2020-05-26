
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://iPet:iPet1234@ipet-s4u0w.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

requireDir('./src/models')


app.use('/api', require('./src/Routes'))


app.listen(process.env.PORT || 3001)

// Server iPet