const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    res.json({
        status: 'success',
        newUser,
    });
});
