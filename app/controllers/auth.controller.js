// get login page
const loginPage = (req, res) => {
    res.render('auth/login', {
        user: null,
        link: "login"
    });
}

// get register page
const registerPage = (req, res) => {
    res.render('auth/register', {
        user: null,
        link: "register"
    });
}

// logout route
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            req.flash({ 'message': `Error: ${err}` });
        }
    });
    res.redirect('/');
}

// export
module.exports = {
    loginPage,
    registerPage,
    logout
}