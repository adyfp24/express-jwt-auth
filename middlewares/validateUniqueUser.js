const { User } = require('../models');

const validateUniqueUser = async (req, res, next) => {
    try {
        const { username, email } = req.body;

        // Validasi username
        const usernameExists = await User.findOne({
            where: { username }
        });
        if (usernameExists) {
            return res.status(400).json({
                success: false,
                message: 'Username sudah digunakan. Pilih username lain.'
            });
        }

        // Validasi email
        const emailExists = await User.findOne({
            where: { email }
        });
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah digunakan. Pilih email lain.'
            });
        }

        // Jika username dan email unik, lanjutkan ke langkah selanjutnya
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error}`
        });
    }
};

module.exports = {
    validateUniqueUser
};