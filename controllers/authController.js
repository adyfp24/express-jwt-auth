const User = require('../models').User;

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({
            username,
            email,
            password
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

}
const logout = async (req, res) => {

}

module.exports = {
    register,
    login,
    logout
}