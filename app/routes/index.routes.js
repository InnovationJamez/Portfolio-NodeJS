const express = require('express');
const router = express.Router();

const indexRouter = require('../controllers/index.controller');

router.get('/', indexRouter.home);

router.get('/exp', indexRouter.exp);

router.get('/project', indexRouter.project);

router.get('/freelance', indexRouter.freelance);

module.exports = router;