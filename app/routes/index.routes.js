const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/exp', (req, res)=>{
    res.render('exp');
});

router.get('/project', (req, res)=>{
    res.render('project');
});

module.exports = router;