const express = require('express')

const app = express()

app.get('/', async(req, res) => {
    res.send({ 'message': 'Bem vindo a API do iPet'})
})

app.listen(3001)

// Server