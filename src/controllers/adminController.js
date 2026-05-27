const userModel  = require('../models/userModel');
const boardModel = require('../models/boardModel');
const taskModel  = require('../models/taskModel');
const { DEMO_STATS, DEMO_ACTIVITY } = require('../config/demoData');

// GET /admin/dashboard
exports.getDashboard = (req, res) => {
  const user         = req.session.user;
  const recentUsers  = userModel.getAll().slice(0, 4);
  const boards       = boardModel.getAll().slice(0, 3);

  res.render('admin/dashboard', {
    title: 'Panel de Administración — Kandex',
    user,
    stats: DEMO_STATS,
    recentUsers,
    boards,
    activity: DEMO_ACTIVITY
  });
};

// GET /admin/users
exports.getUsers = (req, res) => {
  const user    = req.session.user;
  const { search, role, status } = req.query;
  let users = userModel.getAll();

  if (search) {
    users = users.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (role   && role   !== 'all') users = users.filter(u => u.role   === role);
  if (status && status !== 'all') users = users.filter(u => u.status === status);

  res.render('admin/users', {
    title: 'Gestión de Usuarios — Kandex',
    user,
    users,
    totalUsers: userModel.getAll().length,
    filters: { search: search || '', role: role || 'all', status: status || 'all' }
  });
};

// GET /admin/boards
exports.getBoards = (req, res) => {
  const user   = req.session.user;
  const { search, status } = req.query;
  let boards = boardModel.getAll();

  if (search) {
    boards = boards.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
  }
  if (status && status !== 'all') boards = boards.filter(b => b.status === status);

  const stats = boardModel.getStats();

  res.render('admin/boards', {
    title: 'Gestión de Tableros — Kandex',
    user,
    boards,
    stats,
    filters: { search: search || '', status: status || 'all' }
  });
};

// GET /admin/profile
exports.getProfile = (req, res) => {
  const user = req.session.user;
  res.render('admin/profile', {
    title: 'Mi Perfil — Kandex Admin',
    user
  });
};

// POST /admin/profile
exports.postProfile = (req, res) => {
  const { name, email, password, password2 } = req.body;
  const { getInitials } = require('../models/userModel');

  if (!name || !email) {
    req.flash('error_msg', 'El nombre y el email no pueden estar vacíos.');
    return res.redirect('/admin/profile');
  }

  if (password && password !== password2) {
    req.flash('error_msg', 'Las contraseñas no coinciden.');
    return res.redirect('/admin/profile');
  }

  req.session.user.name     = name.trim();
  req.session.user.email    = email.trim().toLowerCase();
  req.session.user.initials = getInitials(name.trim());

  req.flash('success_msg', 'Cambios guardados correctamente.');
  res.redirect('/admin/profile');
};
