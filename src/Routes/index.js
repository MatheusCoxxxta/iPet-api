const express = require('express')
const routes = express.Router()

routes.get('/', async(req, res) => {
    res.send({ 'message': 'Bem vindo a API do iPet'})
})

module.exports = routes