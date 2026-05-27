const { DEMO_USERS } = require('../config/demoData');
const bcrypt = require('bcryptjs');

// En producción, reemplazar con consultas a MySQL via db.js

function findByEmail(email) {
  return DEMO_USERS.find(u => u.email === email.toLowerCase()) || null;
}

function findById(id) {
  return DEMO_USERS.find(u => u.id === parseInt(id)) || null;
}

function getAll() {
  return DEMO_USERS;
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function validatePassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = { findByEmail, findById, getAll, getInitials, validatePassword };
