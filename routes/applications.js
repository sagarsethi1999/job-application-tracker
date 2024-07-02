const express = require('express');
const { logApplication, getApplications,updateApplicationStatus} = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig'); 
const router = express.Router();

router.post('/', authMiddleware,upload, logApplication);
router.get('/', authMiddleware, getApplications);
router.put('/:applicationId', authMiddleware, updateApplicationStatus);


module.exports = router;
