const express = require('express');
const { saveJob, getJobs } = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, saveJob);
router.get('/', authMiddleware, getJobs);

module.exports = router;
