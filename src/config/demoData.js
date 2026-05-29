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
    name: 'Tahis Canello',
    email: 'tv@kandex.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    status: 'active',
    boards: 1,
    color: '#6366f1'
  },
  {
    id: 3,
    name: 'Daisy Toledo',
    email: 'daisy@kandex.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    status: 'active',
    boards: 1,
    color: '#10b981'
  },
  {
    id: 4,
    name: 'Tahis Valdivia',
    email: 'tahis@kandex.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    status: 'active',
    boards: 1,
    color: '#f59e0b'
  },
  {
    id: 5,
    name: 'Marría Inostroza',
    email: 'marria@kandex.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    status: 'inactive',
    boards: 0,
    color: '#ef4444'
  },
  {
    id: 6,
    name: 'Renata Amigo',
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
    owner_id: [2, 3, 6],
    owner_name: 'Tahis Canello / Daisy Toledo / Renata Amigo',
    owner_initials: 'TC/DT/RA',
    owner_color: '#6366f1',
    members: 3,
    tasks: 12,
    progress: 38,
    status: 'active'
  },
];

const DEMO_TASKS = [
  { id: 1, usuario_id: [1, 4], titulo: 'Diseñar wireframes',   descripcion: 'Prototipos para pantallas principales de la app móvil.', estado: 'Por realizar', prioridad: 'Alta',    board_id: 1 },
  { id: 2, usuario_id: [1, 4], titulo: 'Configurar CI/CD',     descripcion: 'Pipeline automático con GitHub Actions.',               estado: 'Por realizar', prioridad: 'Media',   board_id: 1 },
  { id: 3, usuario_id: [1, 4], titulo: 'API de autenticación', descripcion: 'Login con JWT y refresh tokens seguros.',               estado: 'En proceso',   prioridad: 'Urgente', board_id: 1 },
  { id: 4, usuario_id: [1, 4], titulo: 'Módulo de reportes',   descripcion: 'Gráficas de progreso semanal por equipo.',              estado: 'En proceso',   prioridad: 'Media',   board_id: 1 },
  { id: 5, usuario_id: [1, 4], titulo: 'Setup del proyecto',   descripcion: 'Configurar Express, EJS y estructura MVC.',             estado: 'Realizado',    prioridad: 'Baja',    board_id: 1 },
  { id: 6, usuario_id: [1, 4], titulo: 'Schema MySQL',         descripcion: 'Esquema de base de datos y migraciones.',               estado: 'Realizado',    prioridad: 'Alta',    board_id: 1 },
  { id: 7, usuario_id: [2, 3, 6], titulo: 'Reorganizar Documentación', descripcion: 'Estructurar y actualizar la documentación del proyecto.', estado: 'En proceso', prioridad: 'Alta',   board_id: 2 },
  { id: 8, usuario_id: [2, 3, 6], titulo: 'Agregar Índice', descripcion: 'Falta el índice.', estado: 'En proceso',   prioridad: 'Media',    board_id: 2 },
  { id: 9, usuario_id: [2, 3, 6], titulo: 'Agregar puntos fuertes',     descripcion: 'Agregar lo solicitado por el profe',        estado: 'Realizado',    prioridad: 'Media',    board_id: 2 },
  { id: 10, usuario_id: [2, 3, 6], titulo: 'Integrar propuestas', descripcion: 'Agregar al documento las propuestas hechas por nosotras',   estado: 'Por realizar', prioridad: 'Baja',   board_id: 2 },
  { id: 11, usuario_id: [2, 3, 6], titulo: 'Fechas importantes',    descripcion: 'Agregar fechas de captura',         estado: 'Realizado',   prioridad: 'Baja',    board_id: 2 },
  { id: 12, usuario_id: [2, 3, 6], titulo: 'Formato APA 7',    descripcion: 'FALTA EL FORMATO APA',                   estado: 'Por realizar',    prioridad: 'Alta',   board_id: 2 },
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