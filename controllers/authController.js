const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req, res) => {
    const { username, email, password, careerGoals } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, careerGoals });
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user.id, username: user.username, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        console.log(token);
        res.json({ message: 'User logged in successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};



const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email', 'careerGoals']
        });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};


const editProfile = async (req, res) => {
    const { username, email, careerGoals } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.username = username;
        user.email = email;
        user.careerGoals = careerGoals;
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};




module.exports = { register, login, getProfile, editProfile };
