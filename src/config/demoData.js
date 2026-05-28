const bcrypt = require('bcryptjs');

const DEMO_USERS = [
  {
    id: 1,
    name: 'Moha Admin',
    email: 'admin@kandex.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    status: 'active',
    boards: 1,
    color: '#f59e0b'
  },
  {
    id: 2,
    name: 'Tahis Canello', //Ana García
    email: 'tv@kandex.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    status: 'active',
    boards: 1,
    color: '#6366f1'
  },
  {
    id: 3,
    name: 'Daisy Toledo', //Luis Mendoza
    email: 'daisy@kandex.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    status: 'active',
    boards: 1,
    color: '#10b981'
  },
  {
    id: 4,
    name: 'Tahis Valdivia', //Sofía Ríos
    email: 'tahis@kandex.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    status: 'active',
    boards: 1,
    color: '#f59e0b'
  },
  {
    id: 5,
    name: 'Marría Inostroza', //Juan Pérez
    email: 'marria@kandex.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    status: 'inactive',
    boards: 0,
    color: '#ef4444'
  },
  {
    id: 6,
    name: 'Renata Amigo', //María López
    email: 'renata@kandex.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    status: 'pending',
    boards: 1,
    color: '#8b5cf6'
  }
];

const DEMO_BOARDS = [
  {
    id: 1,
    name: 'Desarrollo Kandex',
    owner_id: 4,
    owner_name: 'Tahis Valdivia',
    owner_initials: 'TV',
    owner_color: '#f59e0b',
    members: 2,
    tasks: 18,
    progress: 72,
    status: 'active'
  },
  {
    id: 2,
    name: 'Ecuipo Maravilla Fluorescente',
    owner_id: 2,
    owner_name: 'Tahis Canello',
    owner_initials: 'TC',
    owner_color: '#6366f1',
    members: 3,
    tasks: 12,
    progress: 38,
    status: 'active'
  },
];

const DEMO_TASKS = [
  { id: 1, title: 'Diseñar wireframes',   description: 'Prototipos para pantallas principales de la app móvil.', status: 'Por realizar', priority: 'Alta',    board_id: 1 },
  { id: 2, title: 'Configurar CI/CD',     description: 'Pipeline automático con GitHub Actions.',               status: 'Por realizar', priority: 'Media',   board_id: 1 },
  { id: 3, title: 'API de autenticación', description: 'Login con JWT y refresh tokens seguros.',               status: 'En proceso',   priority: 'Urgente', board_id: 1 },
  { id: 4, title: 'Módulo de reportes',   description: 'Gráficas de progreso semanal por equipo.',              status: 'En proceso',   priority: 'Media',   board_id: 1 },
  { id: 5, title: 'Setup del proyecto',   description: 'Configurar Express, EJS y estructura MVC.',             status: 'Realizado',    priority: 'Baja',    board_id: 1 },
  { id: 6, title: 'Schema MySQL',         description: 'Esquema de base de datos y migraciones.',               status: 'Realizado',    priority: 'Alta',    board_id: 1 },
  { id: 7, title: 'Reorganizar Documentación', description: 'Estructurar y actualizar la documentación del proyecto.', status: 'En proceso', priority: 'Alta',   board_id: 2 },
  { id: 8, title: 'Agregar Índice', description: 'Falta el índice.', status: 'En proceso',   priority: 'Media',    board_id: 2 },
  { id: 9, title: 'Agregar puntos fuertes',     description: 'Agregar lo solicitado por el profe',        status: 'Realizado',    priority: 'Media',    board_id: 2 },
  { id: 10, title: 'Integrar propuestas', description: 'Agregar al documento las propuestas hechas por nosotras',   status: 'Por realizar', priority: 'Baja',   board_id: 2 },
  { id: 11, title: 'Fechas importantes',    description: 'Agregar fechas de captura',         status: 'Realizado',   priority: 'Baja',    board_id: 2 },
  { id: 12, title: 'Formato APA 7',    description: 'FALTA EL FORMATO APA',                   status: 'Por realizar',    priority: 'Alta',   board_id: 2 },
];

const DEMO_STATS = {
  total_users: 7,
  total_boards: 2,
  completed_tasks: 14,
  urgent_tasks: 5
};

const DEMO_ACTIVITY = [
  { icon: 'bi-person-plus-fill', icon_color: '#2563eb', bg_color: '#eff6ff', text: 'Nuevo usuario: <strong>Renata Amigo</strong>',   time: 'Hace 12 min' },
  { icon: 'bi-kanban',           icon_color: '#d97706', bg_color: '#fef3c7', text: 'Tablero <strong>"Backend API"</strong> creado',  time: 'Hace 1 hora' },
  { icon: 'bi-person-x-fill',    icon_color: '#db2777', bg_color: '#fce7f3', text: 'Cuenta suspendida: <strong>Marría Inostroza</strong>', time: 'Hace 3 horas' },
  { icon: 'bi-check-circle-fill',icon_color: '#16a34a', bg_color: '#dcfce7', text: '<strong>17 tareas</strong> completadas esta semana', time: 'Ayer' }
];

module.exports = { DEMO_USERS, DEMO_BOARDS, DEMO_TASKS, DEMO_STATS, DEMO_ACTIVITY };
