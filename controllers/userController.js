// const User = require('../models').User;

const me = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'anda telah terautentikasi login',
            data: user
        })
    } catch (error) {
        res.status(error).json({
            success: false,
            message: 'anda tidak terautentikasi',
        })
    }
}

module.exports = {me}