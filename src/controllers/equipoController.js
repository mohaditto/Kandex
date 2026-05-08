const Equipo = require('../models/equipoModel');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

exports.index = async (req, res) => {
    try {
        const equipos = await Equipo.findAll();
        res.render('equipos/index', { equipos, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener equipos');
    }
};

exports.getCreate = (req, res) => {
    res.render('equipos/create', { user: req.user });
};

exports.postCreate = async (req, res) => {
    try {
        const { nombre_equipo, descripcion } = req.body;
        const equipoId = await Equipo.create({ nombre_equipo, descripcion });
        await Equipo.addUser(equipoId, req.user.id);
        res.redirect('/equipos');
    } catch (err) {
        console.error(err);
        res.redirect('/equipos/create');
    }
};

exports.detail = async (req, res) => {
    try {
        const equipo = await Equipo.findById(req.params.id);
        const usuarios = await Equipo.getUsersByTeam(req.params.id);
        res.render('equipos/detalle', { equipo, usuarios, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener equipo');
    }
};

exports.delete = async (req, res) => {
    try {
        await Equipo.delete(req.params.id);
        res.redirect('/equipos');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar equipo');
    }
};