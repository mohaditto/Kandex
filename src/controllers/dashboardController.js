const Task = require('../models/taskModel');

exports.index = async (req, res) => {
    try {
        const tareas = await Task.findByUser(req.user.id);
        res.render('dashboard', { tareas, user: req.user });
    } catch (err) {
        console.error('Error cargando tareas:', err);
    }
};