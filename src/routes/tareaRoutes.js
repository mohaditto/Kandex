const express = require('express');
const tareaController = require('../controllers/tareaController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', ensureAuthenticated, tareaController.getTareas);
router.get('/create', ensureAuthenticated, tareaController.getCreate);
router.post('/create', ensureAuthenticated, tareaController.postCreate);
router.get('/edit/:id', ensureAuthenticated, tareaController.getEdit);
router.post('/edit/:id', ensureAuthenticated, tareaController.postEdit);
router.get('/delete/:id', ensureAuthenticated, tareaController.delete);
router.post('/update-position', ensureAuthenticated, tareaController.updatePosition);

module.exports = router;