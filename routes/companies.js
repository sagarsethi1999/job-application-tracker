const express = require('express');
const { addCompany, getCompanies } = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addCompany);
router.get('/', authMiddleware, getCompanies);

module.exports = router;
