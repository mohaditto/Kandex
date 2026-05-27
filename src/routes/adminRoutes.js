const express = require('express');
const router  = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { ensureAdmin }         = require('../middlewares/roleMiddleware');

router.use(ensureAuthenticated);
router.use(ensureAdmin);

router.get('/dashboard', adminController.getDashboard);
router.get('/users',     adminController.getUsers);
router.get('/boards',    adminController.getBoards);
router.get('/profile',   adminController.getProfile);
router.post('/profile',  adminController.postProfile);

module.exports = router;
