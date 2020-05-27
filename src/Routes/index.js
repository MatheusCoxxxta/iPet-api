const express = require('express')
const routes = express.Router()

const AuthController = require('../Controllers/Auth/Auth');
const PetController = require('../Controllers/PetController');
const UserController = require('../Controllers/UserController');

routes.get('/', async(req, res) => {
    res.send({ 'message': 'Bem vindo a API do iPet'})
})

/**
 * Auth Routes
 */

routes.post('/auth/register', AuthController.register)
routes.post('/auth/login', AuthController.auth)

/**
 * User Routes
 */

routes.get('/user', UserController.index)
routes.get('/user/:id', UserController.show)
routes.delete('/user/:id', UserController.destroy)

/**
 * Pet Routes
 */

routes.get('/pet/:ownerId', PetController.index)
routes.get('/pet/show/:id', PetController.show)
routes.post('/pet/create', PetController.store)
routes.put('/pet/update/:id', PetController.update)
routes.delete('/pet/destroy/:id', PetController.destroy)

module.exports = routes