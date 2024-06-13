var express = require('express');
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs')



const accountController = require("../controllers/accountController");

/* NEW USER CREATION GET & POST */
router.get("/sign-up", accountController.accountCreateGet)

router.post("/sign-up", accountController.accountCreatePost)

/* LOGIN GET & POST */
router.get("/login", accountController.loginGet)

// passport set-up
passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        };
        return done(null, user);
      } catch (err) {
        return done(err);
      };
    })
  );

passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
try {
    const user = await User.findById(id);
    done(null, user);
} catch (err) {
    done(err);
};
});

router.post("/login", accountController.loginPost)

module.exports = router;
