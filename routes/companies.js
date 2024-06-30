const express = require('express');
const { addCompany } = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addCompany);

module.exports = router;
