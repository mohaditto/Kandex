const { DEMO_BOARDS } = require('../config/demoData');

function getAll() {
  return DEMO_BOARDS;
}

function findById(id) {
  return DEMO_BOARDS.find(b => b.id === parseInt(id)) || null;
}

function getByOwnerId(userId) {
  return DEMO_BOARDS.filter(b => b.owner_id === parseInt(userId));
}

function getStats() {
  const active   = DEMO_BOARDS.filter(b => b.status === 'active').length;
  const archived = DEMO_BOARDS.filter(b => b.status === 'archived').length;
  return { total: DEMO_BOARDS.length, active, archived };
}

module.exports = { getAll, findById, getByOwnerId, getStats };
