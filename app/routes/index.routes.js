const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');

const indexRouter = require('../controllers/index.controller');

router.get('/', indexRouter.home);

router.get('/exp', indexRouter.exp);

router.get('/project', indexRouter.project);

router.get('/freelance', indexRouter.freelance);

router.post("/contact", (req, res)=>{
    req.flash("error", "feature not setup please send requests to innovationjames@gmail.com");
    res.redirect("/freelance");
});

module.exports = router;