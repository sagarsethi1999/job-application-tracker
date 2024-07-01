const express = require('express');
const { setReminder,getReminders, getNotifications } = require('../controllers/reminderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, setReminder);
router.get('/', authMiddleware, getReminders);
router.get('/notifications', authMiddleware, getNotifications);

module.exports = router;
