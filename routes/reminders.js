const express = require('express');
const { setReminder,getReminders } = require('../controllers/reminderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, setReminder);
router.get('/', authMiddleware, getReminders);

module.exports = router;
