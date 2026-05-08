const express = require('express');
const reporteController = require('../controllers/reporteController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', ensureAuthenticated, reporteController.index);
router.get('/filtrar', ensureAuthenticated, reporteController.filtrarPorFecha);

module.exports = router;