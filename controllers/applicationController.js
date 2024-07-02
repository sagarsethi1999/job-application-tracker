const { Application } = require('../models');
const { Op } = require('sequelize');

// const logApplication = async (req, res) => {
//     const { companyName, jobTitle, applicationDate, status, notes } = req.body;
//     try {
//         const application = await Application.create({ companyName, jobTitle, applicationDate, status, notes, UserId: req.user.id });

//         res.status(201).json({ message: 'Application logged successfully', application });
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging application', error: error.message });
//     }
// };
const logApplication = async (req, res) => {
    const { companyName, jobTitle, applicationDate, status, notes } = req.body;
    console.log(companyName);

    try {
        
        const resume = req.files['resume'][0];
        const coverLetter = req.files['coverLetter'][0];
      

        const application = await Application.create({
            companyName,
            jobTitle,
            applicationDate,
            status,
            notes,
            resumeUrl: resume.path,
            coverLetterUrl: coverLetter.path,
            UserId: req.user.id 
        });
        

        res.status(201).json({ message: 'Application logged successfully', application });
    } catch (error) {
        res.status(500).json({ message: 'Error logging application', error: error.message });
    }
}






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
            attributes: ['applicationId', 'companyName', 'jobTitle', 'applicationDate', 'status', 'notes','resumeUrl','coverLetterUrl']
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



module.exports = { logApplication, getApplications, updateApplicationStatus };
