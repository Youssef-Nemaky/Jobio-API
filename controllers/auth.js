const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        res.json({
            status: 'success',
            newUser,
        });
    } catch (error) {
        res.json({
            status: 'fail',
            error,
        });
    }
};
