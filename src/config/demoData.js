const bcrypt = require('bcryptjs');

const DEMO_USERS = [
  {
    id: 1,
    name: 'Carlos Admin',
    email: 'admin@kandex.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    status: 'active',
    boards: 5,
    color: '#f59e0b'
  },
  {
    id: 2,
    name: 'Ana García',
    email: 'ana@kandex.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    status: 'active',
    boards: 2,
    color: '#6366f1'
  },
  {
    id: 3,
    name: 'Luis Mendoza',
    email: 'luis@kandex.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    status: 'active',
    boards: 3,
    color: '#10b981'
  },
  {
    id: 4,
    name: 'Sofía Ríos',
    email: 'sofia@kandex.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    status: 'active',
    boards: 5,
    color: '#f59e0b'
  },
  {
    id: 5,
    name: 'Juan Pérez',
    email: 'juan@kandex.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    status: 'inactive',
    boards: 1,
    color: '#ef4444'
  },
  {
    id: 6,
    name: 'María López',
    email: 'maria@kandex.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    status: 'pending',
    boards: 0,
    color: '#8b5cf6'
  }
];

const DEMO_BOARDS = [
  {
    id: 1,
    name: 'Frontend Squad',
    owner_id: 2,
    owner_name: 'Ana García',
    owner_initials: 'AG',
    owner_color: '#6366f1',
    members: 6,
    tasks: 18,
    progress: 72,
    status: 'active'
  },
  {
    id: 2,
    name: 'Backend API',
    owner_id: 3,
    owner_name: 'Luis Mendoza',
    owner_initials: 'LM',
    owner_color: '#10b981',
    members: 4,
    tasks: 12,
    progress: 38,
    status: 'active'
  },
  {
    id: 3,
    name: 'Mobile App',
    owner_id: 4,
    owner_name: 'Sofía Ríos',
    owner_initials: 'SR',
    owner_color: '#f59e0b',
    members: 5,
    tasks: 21,
    progress: 55,
    status: 'active'
  },
  {
    id: 4,
    name: 'Diseño UX v1',
    owner_id: 5,
    owner_name: 'Juan Pérez',
    owner_initials: 'JP',
    owner_color: '#64748b',
    members: 3,
    tasks: 9,
    progress: 100,
    status: 'archived'
  }
];

const DEMO_TASKS = [
  { id: 1, title: 'Diseñar wireframes',   description: 'Prototipos para pantallas principales de la app móvil.', status: 'Por realizar', priority: 'Alta',    board_id: 1 },
  { id: 2, title: 'Configurar CI/CD',     description: 'Pipeline automático con GitHub Actions.',               status: 'Por realizar', priority: 'Media',   board_id: 1 },
  { id: 3, title: 'API de autenticación', description: 'Login con JWT y refresh tokens seguros.',               status: 'En proceso',   priority: 'Urgente', board_id: 1 },
  { id: 4, title: 'Módulo de reportes',   description: 'Gráficas de progreso semanal por equipo.',              status: 'En proceso',   priority: 'Media',   board_id: 1 },
  { id: 5, title: 'Setup del proyecto',   description: 'Configurar Express, EJS y estructura MVC.',             status: 'Realizado',    priority: 'Baja',    board_id: 1 },
  { id: 6, title: 'Schema MySQL',         description: 'Esquema de base de datos y migraciones.',               status: 'Realizado',    priority: 'Alta',    board_id: 1 }
];

const DEMO_STATS = {
  total_users: 24,
  total_boards: 8,
  completed_tasks: 142,
  urgent_tasks: 5
};

const DEMO_ACTIVITY = [
  { icon: 'bi-person-plus-fill', icon_color: '#2563eb', bg_color: '#eff6ff', text: 'Nuevo usuario: <strong>María López</strong>',   time: 'Hace 12 min' },
  { icon: 'bi-kanban',           icon_color: '#d97706', bg_color: '#fef3c7', text: 'Tablero <strong>"Backend API"</strong> creado',  time: 'Hace 1 hora' },
  { icon: 'bi-person-x-fill',    icon_color: '#db2777', bg_color: '#fce7f3', text: 'Cuenta suspendida: <strong>Juan Pérez</strong>', time: 'Hace 3 horas' },
  { icon: 'bi-check-circle-fill',icon_color: '#16a34a', bg_color: '#dcfce7', text: '<strong>42 tareas</strong> completadas esta semana', time: 'Ayer' }
];

module.exports = { DEMO_USERS, DEMO_BOARDS, DEMO_TASKS, DEMO_STATS, DEMO_ACTIVITY };
