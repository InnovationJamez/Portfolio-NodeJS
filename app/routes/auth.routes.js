const authControl = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();
const passport = require('passport');

// get signin page
router.get("/login", authControl.loginPage);

// get the register page
router.get("/register", authControl.registerPage); 

// login route
router.post("/login", passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

// register new user route
router.post("/register", passport.authenticate('local-signup', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/register',
    failureFlash: true
}));

// logout route
router.delete("/logout", authControl.logout);

//export routes
module.exports = router;