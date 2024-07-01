const Company = require('../models/company');

const addCompany = async (req, res) => {
    const { name, contactDetails, companySize, industry, notes } = req.body;
    try {
        const company = await Company.create({ name, contactDetails, companySize, industry, notes, UserId: req.user.id });
        res.status(201).json({ message: 'Company profile created successfully', company });
    } catch (error) {
        res.status(500).json({ message: 'Error creating company profile', error });
    }
};


const getCompanies = async (req, res) => {
    console.log(' in get companies');
    try {
        const companies = await Company.findAll({
            where: { userId: req.user.id },
            attributes: ['companyId', 'name', 'contactDetails', 'companySize', 'industry', 'notes']
        });
        res.json({ companies });
        console.log({ companies });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving companies', error });
    }
};

module.exports = { addCompany, getCompanies };
