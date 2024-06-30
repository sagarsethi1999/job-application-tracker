const { Company } = require('../models');

const addCompany = async (req, res) => {
    const { name, contactDetails, companySize, industry, notes } = req.body;
    try {
        const company = await Company.create({ name, contactDetails, companySize, industry, notes });
        res.status(201).json({ message: 'Company profile created successfully', company });
    } catch (error) {
        res.status(500).json({ message: 'Error creating company profile', error });
    }
};

module.exports = { addCompany };
