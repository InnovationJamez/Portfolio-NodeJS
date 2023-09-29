const express = require('express');
const router = express.Router();

router.get('/profile', (req, res)=>{
    res.render('user/profile');
});

router.get('/all', (req, res)=>{
    res.send('all users');
});

module.exports = router;