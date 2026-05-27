const { DEMO_TASKS } = require('../config/demoData');

function getAll() {
  return DEMO_TASKS;
}

function getByBoardId(boardId) {
  return DEMO_TASKS.filter(t => t.board_id === parseInt(boardId));
}

function getByStatus(boardId, status) {
  return DEMO_TASKS.filter(t => t.board_id === parseInt(boardId) && t.status === status);
}

function getKanbanColumns(boardId) {
  const tasks = getByBoardId(boardId);
  return {
    porRealizar: tasks.filter(t => t.status === 'Por realizar'),
    enProceso:   tasks.filter(t => t.status === 'En proceso'),
    realizado:   tasks.filter(t => t.status === 'Realizado')
  };
}

function getUserStats(boardId) {
  const tasks = getByBoardId(boardId);
  return {
    total:       tasks.length,
    porRealizar: tasks.filter(t => t.status === 'Por realizar').length,
    enProceso:   tasks.filter(t => t.status === 'En proceso').length,
    realizado:   tasks.filter(t => t.status === 'Realizado').length
  };
}

module.exports = { getAll, getByBoardId, getByStatus, getKanbanColumns, getUserStats };
