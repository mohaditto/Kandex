const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { normalizeRole } = require('../middlewares/roleMiddleware');

// Roles válidos en la BD
const ROLES_VALIDOS = ['Administrador', 'Líder', 'Miembro'];

function normalizeUser(row) {
    return row ? { ...row, rol: normalizeRole(row.rol) } : row;
}

class Usuario {
    static async create({ nombre_usuario, email, password, rol }) {
        // Validar que el rol sea válido
        const rolFinal = ROLES_VALIDOS.includes(rol) ? rol : 'Miembro';
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.promise().query(
            'INSERT INTO usuarios (nombre_usuario, email, password_hash, rol) VALUES (?, ?, ?, ?)',
            [nombre_usuario, email, hashedPassword, rolFinal]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return normalizeUser(rows[0]);
    }

    static async findAll() {
        const [rows] = await db.promise().query(
            `SELECT u.*,
                    GROUP_CONCAT(e.nombre_equipo ORDER BY e.nombre_equipo SEPARATOR ', ') AS equipos
             FROM usuarios u
             LEFT JOIN equipo_usuarios eu ON eu.usuario_id = u.id
             LEFT JOIN equipos e ON e.id = eu.equipo_id
             GROUP BY u.id
             ORDER BY u.nombre_usuario`
        );
        return rows.map(normalizeUser);
    }

    static async findById(id) {
        const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return normalizeUser(rows[0]);
    }

    static async update(id, { nombre_usuario, email, rol }) {
        // Validar que el rol sea un valor válido del ENUM
        const rolFinal = ROLES_VALIDOS.includes(rol) ? rol : 'Miembro';
        await db.promise().query(
            'UPDATE usuarios SET nombre_usuario = ?, email = ?, rol = ? WHERE id = ?',
            [nombre_usuario, email, rolFinal, id]
        );
    }
}

module.exports = Usuario;
