const User = require('../models').User;

const getMe = (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Anda tidak terautentikasi',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Anda telah terautentikasi login',
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan dalam server',
        });
    }
}

module.exports = { getMe }