const express = require('express')

const app = express()
const routes = require('./src/Routes')
app.use('/api', routes)

app.listen(3001)

// Server