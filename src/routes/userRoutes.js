const express = require('express');
const router  = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { ensureUser }          = require('../middlewares/roleMiddleware');

router.use(ensureAuthenticated);

router.get('/dashboard', userController.getDashboard);
router.get('/board',     userController.getBoard);
router.get('/profile',   userController.getProfile);
router.post('/profile',  userController.postProfile);

module.exports = router;
