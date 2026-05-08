const db = require('../config/db');

class Etiqueta {
    static async create({ nombre, color }) {
        const [result] = await db.promise().query(
            'INSERT INTO etiquetas (nombre, color) VALUES (?, ?)',
            [nombre, color]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.promise().query('SELECT * FROM etiquetas');
        return rows;
    }

    static async addToTask(tarea_id, etiqueta_id) {
        await db.promise().query(
            'INSERT INTO tarea_etiquetas (tarea_id, etiqueta_id) VALUES (?, ?)',
            [tarea_id, etiqueta_id]
        );
    }

    static async getByTask(tarea_id) {
        const [rows] = await db.promise().query(
            'SELECT e.* FROM etiquetas e JOIN tarea_etiquetas te ON e.id = te.etiqueta_id WHERE te.tarea_id = ?',
            [tarea_id]
        );
        return rows;
    }
}

module.exports = Etiqueta;