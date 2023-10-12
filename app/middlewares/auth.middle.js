const db = require('../models');
const User = db.user;
const Role = db.role;

// check that user is logged in
const checkLogin = (req, res, next) => {
    // user is not logged in 
    if(!req.user){
        return res.redirect('/auth/login');
    }

    // user is logged in :)
    return next();
};

// check the user is moderator
const checkMod = async (req, res, next) => {
    // user is not logged in 
    if(!req.user){
        res.redirect('/auth/login');
    }

    // check access level
    try {
        let role = await Role.findById(req.user.local.role);
        if(role.name !== "moderator"){
            req.flash("error", "user does not have mod access");
            res.redirect('/');
        }

        // user has moderator access 
        return next();
    }
    catch(err) {
        req.flash("error", err.message);
        res.redirect('/');
    }
}

// check the suer is admin 
const checkAdmin = async (req, res, next) => {
    // user is not logged in 
    if(!req.user){
        res.redirect('/auth/login');
    }

    // check access level
    try {
        let role = await Role.findById(req.user.local.role);
        if(role.name !== "admin"){
            req.flash("error", "user does not have admin access");
            res.redirect('/');
        }

        // user has moderator access 
        return next();
    }
    catch(err) {
        req.flash("error", err.message);
        res.redirect('/');
    }
}

module.exports = {
    checkLogin,
    checkMod,
    checkAdmin
}