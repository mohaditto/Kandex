const Task = require('../models/taskModel'); // cambiar despues al de db... y todo lo demas

exports.getTareas = async (req, res) => {
    try {
        const tareas = await Task.findByUser(req.user.id);
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
        await Task.create({
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
        console.log('ID:', req.params.id);
        const tarea = await Task.findById(req.params.id);
        console.log('TAREA:', tarea);
        res.render('tareas/edit', {
            tarea,
            user: req.user
        });
    } catch (err) {
        console.error('ERROR REAL:', err);
        res.status(500).send(err.message);
    }
};

exports.postEdit = async (req, res) => {
    try {
        const { titulo, descripcion, estado, prioridad, fecha_inicio, fecha_limite } = req.body;
        await Task.update(req.params.id, { titulo, descripcion, estado, prioridad, fecha_inicio, fecha_limite });
        res.redirect('/tareas');
    } catch (err) {
        console.error(err);
        res.redirect(`/tareas/edit/${req.params.id}`);
    }
};

exports.delete = async (req, res) => {
    try {
        await Task.delete(req.params.id);
        res.redirect('/tareas');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar tarea');
    }
};

exports.updatePosition = async (req, res) => {
    try {
        const { id, posicion, estado } = req.body;
        await Task.updatePosition(id, posicion, estado);
        if (estado === 'Realizado') {
            await Task.update(id, { 
                titulo: (await Task.findById(id)).titulo,
                descripcion: (await Task.findById(id)).descripcion,
                estado: 'Realizado',
                prioridad: (await Task.findById(id)).prioridad
            });
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};