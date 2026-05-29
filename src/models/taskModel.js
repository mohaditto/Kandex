const { DEMO_TASKS } = require('../config/demoData');

function getAll() {
  return DEMO_TASKS;
}

function getByBoardId(boardId) {
  return DEMO_TASKS.filter(t => t.board_id === parseInt(boardId));
}

function getByStatus(boardId, status) {
  return DEMO_TASKS.filter(t => t.board_id === parseInt(boardId) && t.estado === status);
}

function getKanbanColumns(boardId) {
  const tasks = getByBoardId(boardId);
  return {
    porRealizar: tasks.filter(t => t.estado === 'Por realizar'),
    enProceso:   tasks.filter(t => t.estado === 'En proceso'),
    realizado:   tasks.filter(t => t.estado === 'Realizado')
  };
}

function getUserStats(boardId) {
  const tasks = getByBoardId(boardId);
  return {
    total:       tasks.length,
    porRealizar: tasks.filter(t => t.estado === 'Por realizar').length,
    enProceso:   tasks.filter(t => t.estado === 'En proceso').length,
    realizado:   tasks.filter(t => t.estado === 'Realizado').length
  };
}

function findById(id) {
  return DEMO_TASKS.find(
    t => t.id === parseInt(id)
  );
}

function findByUser(userId) {

  return DEMO_TASKS.filter(
    t => t.usuario_id.includes(parseInt(userId))
  );
}

function create(taskData) {
  const newTask = {
    id: DEMO_TASKS.length + 1,
    ...taskData
  };

  DEMO_TASKS.push(newTask);
  return newTask;
}

function update(id, data) {
  const task = findById(id);
  if (!task) return null;
  Object.assign(task, data);
  return task;
}

function remove(id) {
  const index = DEMO_TASKS.findIndex(
    t => t.id === parseInt(id)
  );
  if (index !== -1) {
    DEMO_TASKS.splice(index, 1);
  }
}

function updatePosition(id, position, status) {
  const task = findById(id);
  if (!task) return null;
  task.position = position;
  task.estado = status;
  return task;
}

module.exports = { getAll, getByBoardId, getByStatus, getKanbanColumns, getUserStats, findById, findByUser, create, update, remove, updatePosition };