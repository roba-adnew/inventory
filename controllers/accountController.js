const asyncHandler = require('express-async-handler');
const User = require('../models/user')


exports.accountCreateGet = asyncHandler(async (req, res, next) => {
    const renderConfig = {
        page: 'signUpForm',
        title: 'Sign Up'
    }
    console.log(renderConfig)
    res.render('layout', renderConfig)
})

exports.accountCreatePost = asyncHandler(async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        const result = await user.save();
        res.redirect("/");
    } catch (err) {
        return next(err);
    };
})