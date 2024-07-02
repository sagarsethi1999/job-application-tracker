require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB, sequelize } = require('./config/database');

const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');
const reminderRoutes = require('./routes/reminders');
const companyRoutes = require('./routes/companies');
const jobRoutes = require('./routes/jobs');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);


app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});


connectDB();
sequelize
.sync({ force:false});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
