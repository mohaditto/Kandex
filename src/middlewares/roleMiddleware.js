function ensureAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  req.flash('error_msg', 'No tienes permisos para acceder a esta sección.');
  res.redirect('/user/dashboard');
}

function ensureUser(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'user') {
    return next();
  }
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return res.redirect('/admin/dashboard');
  }
  req.flash('error_msg', 'Debes iniciar sesión para acceder.');
  res.redirect('/login');
}

module.exports = { ensureAdmin, ensureUser };
