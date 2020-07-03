const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const authConfig = require('../../config/auth');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

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

            return res.send({
                userId: user.id,
                token: generateToken({ id: user.id })
            })
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

    },

    async forgot_password(req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });

            if(!user){
                return res.status(400).send({ error: "user not found"});
            }
                

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            },
            { new: true }
            );

            mailer.sendMail({
                to: email,
                from: 'ipetfatec@gmail.com',
                subject: "Esqueceu sua senha?",
                template: 'src/resources/mail/forgot_password',
                context: { token },
            },(err) => {
                if(err) 
                    res.status(400).send({ error: err});
                return res.send();
            });

        } catch(err) {
            res.status(400).send({ error: 'Erro on forgot password'});
        }
    },

    async reset_password(req, res) {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ email })
                .select('+passwordResetToken passwordResetExpires');

            if(!user)
                return res.status(400).send({ error: "user not found"});

            if(token !== user.passwordResetToken)
                return res.status(400).send({ error: 'Token invalid' });
            

            const now = new Date();

            if(now > user.passwordResetExpires)
                return res.status(400).send({ error: 'Toekn expired, generate a new one' });

            user.password = password;

            await user.save();

            res.send();

        } catch(err) {
            res.status(400).send({ error: 'Cannot reset password'});
        }
    },

    
}