const asyncHandler = require('express-async-handler');
const User = require('../models/user')


exports.loginGet = asyncHandler(async (req, res, next) => {
    const renderConfig = {
        page: 'loginForm',
        title: 'Log-In'
    }
    res.render('layout', renderConfig)
})


// exports.loginPost = asyncHandler(async (req, res, next) => {
//     passport.authenticate("local", {
//         successRedirect: "/",
//         failureRedirect: "/"
//       })
// })

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
        console.log("successful account creation")
        res.redirect("/");
    } catch (err) {
        return next(err);
    };
})