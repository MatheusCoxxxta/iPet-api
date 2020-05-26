const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const authConfig = require('../../config/auth');
const crypto = require('crypto');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}


module.exports = {
    async register (req, res) {
        const { email } = req.body;

        try {
            if(await User.findOne({ email })) {
                return res.status(400).send({ message: 'User already exists' })
            }
            const user = await User.create(req.body)
            user.password = undefined

            return res.send(['Success', {
                user,
                token: generateToken({ id: user.id })
            }])
        } catch (error) {
            return res.status(400).send({ message: error });
        }
    },
    
    async auth (req, res) {
        const { email, password } = req.body;

        try {
            const user = await await User.findOne({ email }).select('+password')

            if(!user) return res.status(400).send({ message: 'User not found'})

            if(!await bcrypt.compare(password, user.password)) return res.status(400).send({ message: 'Invalid password'})

            user.password = undefined

            return res.send({
                userId: user.id,
                token: generateToken({ id: user.id})
            })
        } catch (error) {
            return res.send(error)
        }

    }
}