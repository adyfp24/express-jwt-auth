require('dotenv').config();
const User = require('../models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const expiredTokens = new Set();

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        if (newUser) {
            res.status(200).json({
                success: true,
                message: 'User berhasil didaftarkan',
                data: newUser
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'User gagal didaftarkan',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error}`
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User tidak ditemukan',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const apiToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' });
            res.status(200).json({
                success: true,
                message: 'Login sukses',
                data: user,
                token: apiToken
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Password salah',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const logout = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'unauthenticated',
            });
        }
        expiredTokens.add(user.id);
        res.status(200).json({
            success: true,
            message: 'berhasil logout',
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};


module.exports = {
    register,
    login,
    logout
}