const { Job } = require('../models');

const saveJob = async (req, res) => {
    const { companyId, jobTitle, jobDescription, notes } = req.body;
    try {
        const job = await Job.create({ companyId, jobTitle, jobDescription, notes });
        res.status(201).json({ message: 'Job listing saved successfully', job });
    } catch (error) {
        res.status(500).json({ message: 'Error saving job listing', error });
    }
};

module.exports = { saveJob };
