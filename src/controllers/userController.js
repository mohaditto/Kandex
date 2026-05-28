const taskModel  = require('../models/taskModel');
const boardModel = require('../models/boardModel');
const userModel  = require('../models/userModel');

// GET /user/dashboard
exports.getDashboard = (req, res) => {
  const user      = req.session.user;
  const board     = boardModel.getByOwnerId(user.id)[0] || boardModel.findById(1);
  const stats     = taskModel.getUserStats(board ? board.id : 1);
  const kanban    = taskModel.getKanbanColumns(board ? board.id : 1);
  const previewTasks = {
    porRealizar: kanban.porRealizar.slice(0, 2),
    enProceso:   kanban.enProceso.slice(0, 2),
    realizado:   kanban.realizado.slice(0, 2)
  };

  res.render('user/dashboard', {
    title: `Inicio — ${user.name}`,
    user,
    stats,
    previewTasks,
    boardName: board ? board.name : 'Desarrollo Kandex'
  });
};

// GET /user/board
exports.getBoard = (req, res) => {
  const user   = req.session.user;
  const board  = boardModel.getByOwnerId(user.id)[0] || boardModel.findById(1);
  const kanban = taskModel.getKanbanColumns(board ? board.id : 1);
  const stats  = taskModel.getUserStats(board ? board.id : 1);

  res.render('user/board', {
    title: 'Mi Tablero — Kandex',
    user,
    kanban,
    stats,
    boardName: board ? board.name : 'Desarrollo Kandex'
  });
};

// GET /user/profile
exports.getProfile = (req, res) => {
  const user = req.session.user;
  res.render('user/profile', {
    title: 'Mi Perfil — Kandex',
    user
  });
};

// POST /user/profile
exports.postProfile = (req, res) => {
  const { name, email, password, password2 } = req.body;
  const user = req.session.user;

  if (!name || !email) {
    req.flash('error_msg', 'El nombre y el email no pueden estar vacíos.');
    return res.redirect('/user/profile');
  }

  if (password && password !== password2) {
    req.flash('error_msg', 'Las contraseñas no coinciden.');
    return res.redirect('/user/profile');
  }

  // Actualizar sesión
  req.session.user.name     = name.trim();
  req.session.user.email    = email.trim().toLowerCase();
  req.session.user.initials = userModel.getInitials(name.trim());

  req.flash('success_msg', 'Cambios guardados correctamente.');
  res.redirect('/user/profile');
};
