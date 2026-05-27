const express        = require('express');
const path           = require('path');
const session        = require('express-session');
const flash          = require('connect-flash');
const methodOverride = require('method-override');
const ejsLayouts     = require('express-ejs-layouts');

const authRoutes  = require('./routes/authRoutes');
const userRoutes  = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

/* ── MOTOR DE VISTAS ── */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);
app.set('layout', 'layouts/main');

/* ── MIDDLEWARES ── */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

/* ── SESIÓN ── */
app.use(session({
  secret: process.env.SESSION_SECRET || 'kandex_secret_2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

/* ── FLASH ── */
app.use(flash());

/* ── VARIABLES GLOBALES PARA LAS VISTAS ── */
app.use((req, res, next) => {
  res.locals.currentUser  = req.session.user || null;
  res.locals.success_msg  = req.flash('success_msg');
  res.locals.error_msg    = req.flash('error_msg');
  res.locals.error        = req.flash('error');
  next();
});

/* ── RUTAS ── */
app.use('/',       authRoutes);
app.use('/user',   userRoutes);
app.use('/admin',  adminRoutes);

/* ── 404 ── */
app.use((req, res) => {
  res.status(404).render('404', { layout: 'layouts/auth', title: 'Página no encontrada' });
});

module.exports = app;
