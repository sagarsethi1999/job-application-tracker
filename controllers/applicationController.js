const { Application } = require('../models');
const { Op } = require('sequelize');

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
        const { search, status } = req.query;
        const where = { userId: req.user.id };
        
        if (search) {
            where[Op.or] = [
                { companyName: { [Op.iLike]: `%${search}%` } },
                { jobTitle: { [Op.iLike]: `%${search}%` } }
            ];
        }

        if (status && status !== 'all') {
            where.status = status;
        }

        const applications = await Application.findAll({
            where,
            attributes: ['applicationId', 'companyName', 'jobTitle', 'applicationDate', 'status', 'notes']
        });

        res.json({ applications });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving applications', error });
    }
};

const updateApplicationStatus = async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;
    try {
        const application = await Application.findByPk(applicationId);
        if (application && application.UserId === req.user.id) {
            application.status = status;
            await application.save();
            res.json({ message: 'Status updated successfully', application });
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating status', error });
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

module.exports = { logApplication,getApplications, updateApplicationStatus, uploadAttachment, searchApplications, filterApplications };
