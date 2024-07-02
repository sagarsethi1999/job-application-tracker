const { Reminder, Application, User } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize; 
const SibApiV3Sdk = require('sib-api-v3-sdk');

const dotenv = require('dotenv');
dotenv.config();


const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.EMAIL_API_KEY; 


const sendReminderEmail = async (toEmail, subject, message) => {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    console.log('toemail',toEmail);

    const sendSmtpEmail = {
        to: [{ email: toEmail }],
        sender: { email: 'your@example.com', name: 'Job Application Tracker' },
        subject: subject,
        htmlContent: `<p>${message}</p>`
    };

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Reminder email sent successfully');
    } catch (error) {
        console.error('Error sending reminder email:', error);
    }
};



const checkAndSendReminders = async () => {
    console.log('checking reminder')
    try {
        const reminders = await Reminder.findAll({
            where: {
                reminderDate: {
                    [Sequelize.Op.lte]: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
                }
            }
        });
        reminders.forEach(async (reminder) => {
            const { applicationId, reminderDate } = reminder;
            const application = await Application.findOne({ where: { id: applicationId }, include: [User] });
            
            if (!application || !application.User || !application.User.email) {
                console.error(`Application not found or missing user email for reminder ${reminder.id}`);
                return;
            }
            
            console.log(application.User.email);
            await sendReminderEmail(application.User.email, 'Reminder: Follow Up', `Reminder for application ${applicationId} due on ${reminderDate}`);
        });
    } catch (error) {
        console.error('Error processing reminders:', error);
    }
};

setInterval(checkAndSendReminders,  24 * 60 * 60 * 1000); 




const setReminder = async (req, res) => {
    const { applicationId, reminderDate } = req.body;

    try {
        const reminder = await Reminder.create({ 
            applicationId, 
            reminderDate, 
            UserId: req.user.id 
        });
        res.status(201).json({ message: 'Reminder set successfully', reminder });
    } catch (error) {
        res.status(500).json({ message: 'Error setting reminder', error });
    }
};

const getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.findAll({ where: { UserId: req.user.id }, attributes: ['applicationId', 'reminderDate'] });
        
        res.json({ reminders });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reminders', error });
    }
};

module.exports = { setReminder, getReminders };
