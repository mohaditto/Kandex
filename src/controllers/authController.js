const userModel = require('../models/userModel');

// login
exports.getLogin = (req, res) => {
  res.render('auth/login', {
    layout: 'layouts/auth',
    title: 'Iniciar Sesión — Kandex'
  });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash('error_msg', 'Por favor completa todos los campos.');
    return res.redirect('/login');
  }

  const user = userModel.findByEmail(email.trim().toLowerCase());

  if (!user || !userModel.validatePassword(password, user.password)) {
    req.flash('error_msg', 'Correo o contraseña incorrectos.');
    return res.redirect('/login');
  }

  req.session.user = {
    id:       user.id,
    name:     user.name,
    email:    user.email,
    role:     user.role,
    color:    user.color,
    initials: userModel.getInitials(user.name)
  };

  if (user.role === 'admin') {
    return res.redirect('/admin/dashboard');
  }
  res.redirect('/user/dashboard');
};

// register
exports.getRegister = (req, res) => {
  res.render('auth/register', {
    layout: 'layouts/auth',
    title: 'Crear Cuenta — Kandex'
  });
};

exports.postRegister = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    req.flash('error_msg', 'Por favor completa todos los campos.');
    return res.redirect('/register');
  }

  const existing = userModel.findByEmail(email.trim().toLowerCase());
  if (existing) {
    req.flash('error_msg', 'Ya existe una cuenta con ese correo.');
    return res.redirect('/register');
  }

  // pa despues, crear usuario en bd... db, lo mismo
  req.flash('success_msg', '¡Cuenta creada! Ya puedes iniciar sesión.');
  res.redirect('/login');
};

// logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};