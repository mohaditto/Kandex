const Tarea = require('../models/tareaModel');

exports.getTareas = async (req, res) => {
    try {
        const tareas = await Tarea.findByUser(req.user.id);
        res.render('tareas/board', { tareas, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener tareas');
    }
};

exports.getCreate = (req, res) => {
    res.render('tareas/create', { user: req.user });
};

exports.postCreate = async (req, res) => {
    try {
        const { titulo, descripcion, prioridad, fecha_inicio, fecha_limite } = req.body;
        await Tarea.create({
            usuario_id: req.user.id,
            equipo_id: null,
            titulo,
            descripcion,
            estado: 'Por realizar',
            prioridad,
            fecha_inicio,
            fecha_limite
        });
        res.redirect('/tareas');
    } catch (err) {
        console.error(err);
        res.redirect('/tareas/create');
    }
};

exports.getEdit = async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);
        res.render('tareas/edit', { tarea, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener tarea');
    }
};

exports.postEdit = async (req, res) => {
    try {
        const { titulo, descripcion, estado, prioridad, fecha_inicio, fecha_limite } = req.body;
        await Tarea.update(req.params.id, { titulo, descripcion, estado, prioridad, fecha_inicio, fecha_limite });
        res.redirect('/tareas');
    } catch (err) {
        console.error(err);
        res.redirect(`/tareas/edit/${req.params.id}`);
    }
};

exports.delete = async (req, res) => {
    try {
        await Tarea.delete(req.params.id);
        res.redirect('/tareas');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar tarea');
    }
};

exports.updatePosition = async (req, res) => {
    try {
        const { id, posicion, estado } = req.body;
        await Tarea.updatePosition(id, posicion, estado);
        if (estado === 'Realizado') {
            await Tarea.update(id, { 
                titulo: (await Tarea.findById(id)).titulo,
                descripcion: (await Tarea.findById(id)).descripcion,
                estado: 'Realizado',
                prioridad: (await Tarea.findById(id)).prioridad
            });
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};