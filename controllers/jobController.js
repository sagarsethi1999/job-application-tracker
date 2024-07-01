const { Job } = require('../models');

const saveJob = async (req, res) => {
    const { companyName, jobTitle, jobDescription, notes } = req.body;
    try {
        const job = await Job.create({ companyName, jobTitle, jobDescription, notes, UserId: req.user.id });
        res.status(201).json({ message: 'Job listing saved successfully', job });
    } catch (error) {
        res.status(500).json({ message: 'Error saving job listing', error });
    }
};

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({ where: { userId: req.user.id },
            attributes: ['companyName','jobTitle', 'jobDescription', 'notes'] });
        res.json({ jobs });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving jobs', error });
    }
};

module.exports = { saveJob, getJobs };
