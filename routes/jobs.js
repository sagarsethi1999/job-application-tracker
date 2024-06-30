const express = require('express');
const { saveJob } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, saveJob);

module.exports = router;
