const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { host, port, secure, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
    service: 'gmail',
    host,
    port,
    secure,
    auth: { user, pass }
});

transport.use('compile', hbs({
    viewEngine: {
        partialsDir: 'src/resources/mail/',
        layoutsDir: 'src/resources/mail/',
        defaultLayout: 'forgot_password.html',
        },
    viewPath: './',
    extName: '.html'
}));

module.exports = transport; 