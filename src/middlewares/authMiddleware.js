function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  req.flash('error_msg', 'Debes iniciar sesión para acceder a esta página.');
  res.redirect('/login');
}

function ensureNotAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    if (req.session.user.role === 'admin') {
      return res.redirect('/admin/dashboard');
    }
    return res.redirect('/user/dashboard');
  }
  next();
}

module.exports = { ensureAuthenticated, ensureNotAuthenticated };
