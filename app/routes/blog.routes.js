const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const authMiddle = require('../middlewares/auth.middle');

/*
    get routes for pages
*/

// index page show all blogs 
// a whole lot of crud
router.get('/', blogController.blog_index_get);

// create blog page
router.get('/create', authMiddle.checkMod, blogController.blog_create_get);

// blog info page
router.get('/details/:id', blogController.blog_details_get);

// delete blog page
router.get('/delete/:id', blogController.blog_delete_get);

// blog edit page
router.get('/edit/:id', blogController.blog_edit_get);

/*
    routess for database access
*/

// create post route
router.post('/create', authMiddle.checkMod, blogController.blog_create_post);

// delete blog route
router.delete('/:id', authMiddle.checkMod, blogController.blog_delete_delete);

// blog edit put
router.put('/:id', authMiddle.checkMod, blogController.blog_edit_put);

module.exports = router;