var express = require('express');
var router = express.Router();
const accountController = require("../controllers/accountController");

/* NEW USER CREATION GET AND POST */
router.get("/sign-up", accountController.accountCreateGet)

router.post("/sign-up", accountController.accountCreatePost)

/* NEW USER CREATION GET AND POST */
router.get("/login", accountController.loginGet)

module.exports = router;
