const express = require('express');
const router = express.Router();

const comCtrl = require('../controllers/comment.controller');

const authMiddle = require('../middlewares/auth.middle');

// add comment
router.post('/create', authMiddle.checkLogin, comCtrl.postComment);

// delete comment
router.delete('/:cid/:bid', authMiddle.checkLogin, comCtrl.deleteComment);

module.exports = router;