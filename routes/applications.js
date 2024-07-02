const express = require('express');
const { logApplication, getApplications,updateApplicationStatus, uploadAttachment, searchApplications, filterApplications } = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, logApplication);
router.get('/', authMiddleware, getApplications);
router.put('/:applicationId', authMiddleware, updateApplicationStatus);
router.post('/:id/upload', authMiddleware, uploadAttachment);
router.get('/search', authMiddleware, searchApplications);
router.get('/filter', authMiddleware, filterApplications);

module.exports = router;
