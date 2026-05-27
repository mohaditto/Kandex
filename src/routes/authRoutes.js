const express = require('express');
const router  = express.Router();
const authController = require('../controllers/authController');
const { ensureNotAuthenticated } = require('../middlewares/authMiddleware');

router.get('/',         (req, res) => res.redirect('/login'));
router.get('/login',    ensureNotAuthenticated, authController.getLogin);
router.post('/login',   authController.postLogin);
router.get('/register', ensureNotAuthenticated, authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout',   authController.logout);

module.exports = router;
