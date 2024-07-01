const { Application } = require('../models');

const logApplication = async (req, res) => {
    const { companyName, jobTitle, applicationDate, status, notes } = req.body;
    try {
        const application = await Application.create({ companyName, jobTitle, applicationDate, status, notes, UserId: req.user.id });
        
        res.status(201).json({ message: 'Application logged successfully', application });
    } catch (error) {
        res.status(500).json({ message: 'Error logging application', error: error.message });
    }
};


const getApplications = async (req, res) => {
    try {
        const applications = await Application.findAll({
            where: { userId: req.user.id },
            attributes: ['applicationId', 'companyName', 'jobTitle', 'applicationDate', 'status', 'notes']
        });
        res.json({ applications });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving applications', error });
    }
};

const uploadAttachment = async (req, res) => {
    // Implement file upload logic
    res.status(501).json({ message: 'Not implemented' });
    
};

const searchApplications = async (req, res) => {
    const { keyword } = req.query;
    try {
        const applications = await Application.findAll({
            where: {
                UserId: req.user.id,
                [Sequelize.Op.or]: [
                    { companyName: { [Sequelize.Op.like]: `%${keyword}%` } },
                    { jobTitle: { [Sequelize.Op.like]: `%${keyword}%` } },
                    { notes: { [Sequelize.Op.like]: `%${keyword}%` } }
                ]
            }
        });
        res.json({ applications });
    } catch (error) {
        res.status(500).json({ message: 'Error searching applications', error });
    }
};

const filterApplications = async (req, res) => {
    const { status, dateRange } = req.query;
    res.status(501).json({ message: 'Not implemented' });
};

module.exports = { logApplication,getApplications, uploadAttachment, searchApplications, filterApplications };
