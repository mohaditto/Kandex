const Usuario = require('../models/usuarioModel');
const passport = require('../config/passport');

exports.getLogin = (req, res) => {
    res.render('auth/login');
};

exports.postLogin = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true
});

exports.getRegister = (req, res) => {
    res.render('auth/register');
};

exports.postRegister = async (req, res) => {
    try {
        const { nombre_usuario, email, password, rol } = req.body;
        await Usuario.create({ nombre_usuario, email, password, rol: rol || 'Miembro' });
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.redirect('/auth/register');
    }
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect('/auth/login');
    });
};