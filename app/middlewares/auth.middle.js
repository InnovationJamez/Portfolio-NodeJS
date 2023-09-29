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

// check the users access
const checkAccess = async (access, req, res, next) => {
    // user is not logged in 
    if(!req.user){
        res.redirect('/');
    }

    // check access level
    try {
        let role = await Role.findById(user.local.role);
        if(role.name !== access){
            res.redirect('/');
        }

        // user has moderator access 
        next();
    }
    catch(err) {
        res.redirect('/');
    }
}

// check the user is moderator
const checkMod = async (req, res, next) => {
    checkAccess('moderator', req, res, next);
}

// check the suer is admin 
const checkAdmin = (req, res, next) => {
    checkAccess('admin', req, res, next);
}

module.exports = {
    checkLogin,
    checkMod,
    checkAdmin
}