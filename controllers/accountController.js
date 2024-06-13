const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const User = require('../models/user');


exports.loginGet = asyncHandler(async (req, res, next) => {
    const renderConfig = {
        page: 'loginForm',
        title: 'Log-In',
        user: req.user
    }
    res.render('layout', renderConfig)
})

exports.loginPost = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })


exports.accountCreateGet = asyncHandler(async (req, res, next) => {
    const renderConfig = {
        page: 'signUpForm',
        title: 'Sign Up',
        user: req.user
    }
    console.log(renderConfig)
    res.render('layout', renderConfig)
})


exports.accountCreatePost = asyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            console.log("nah, you had issues at the hash")
            return next(err);
        }
        try {
            const user = new User({
                username: req.body.username,
                password: hashedPassword
            });
            const result = await user.save();
            console.log("successful account creation")
            res.redirect("/");
        } catch (err2) {
            return next(err2);
        };
    })
    
})