const express = require('express');
const { setReminder, getNotifications } = require('../controllers/reminderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, setReminder);
router.get('/notifications', authMiddleware, getNotifications);

module.exports = router;
