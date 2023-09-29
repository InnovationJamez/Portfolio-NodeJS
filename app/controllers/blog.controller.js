const db = require('../models');
const Blog = db.blog;

// legal types for adding images
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

// helper functions 
const addImage = (blog, blogImgaeEncode) => {

    const blogImage = JSON.parse(blogImgaeEncode);

    if(!imageMimeTypes.includes(blogImage.type)){
        return false;
    }

    blog.blogImage = new Buffer.from(blogImage.data, 'base64');
    blog.blogImageType = blogImage.type;

    return true;
}

// index page display all blogs 
const blog_index_get = async (req, res) => {

    let blogs;

    try {
        blogs = await Blog.find({});
        req.flash({message: 'blogs found'});

    } catch (err) {
        blogs = [];
        req.flash({message: `Error ${err}`});
    }

    res.render('blog/index', {
        user: req.user,
        blogs: blogs
    });
}

// create blog page
const blog_create_get = (req, res) => {
    res.render('blog/create', {
        user: req.user,
        blog: new Blog
    });
}

// create blog post
const blog_create_post = async (req, res) => {
    // create new post
    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        content: req.body.content,
        user: req.user.id,
    });

    if(req.body.image && !addImage(blog, req.body.image)){
        req.flash("error", "a non accepted file type was sent");
        return res.redirect('/blog/create');
    }

    try {
        // save the new post
        await blog.save();
        return res.redirect('/blog');
    }
    catch(err){
        req.flash("error", `An error occured: ${err}`);
        return res.redirect('/blog');
    }
}

// blog details get
const blog_details_get = async (req, res) => {
    let id = req.params.id;

    try {
        let blog = await Blog.findById(id)
            .populate("user")
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            }).exec();

        res.render('blog/details', {
            user: req.user,
            blog: blog
        });
    } catch (err) {
        req.flash({message: err});
        res.redirect('/blog');
    }
}

// blog update page get
const blog_edit_get = async (req, res) => {
    let id = req.params.id;

    try {
        let blog = await Blog.findById(id);
        res.render('blog/edit', {
            user: req.user,
            blog: blog
        });
    } catch {
        req.flash('error', err.message);
        res.redirect('/blog');
    }
}

// blog update page put
const blog_edit_put = async (req, res) => {
    let id = req.params.id;

    try {
        let blog = await Blog.findById(id);
        blog.title = req.body.title;
        blog.snippet = req.body.snippet;
        blog.content = req.body.content;

        await blog.save();
        res.redirect('/blog');

    } catch {
        req.flash('error', err.message);
        res.redirect('/blog');
    }
}

// delete page
const blog_delete_get = async (req, res) => {
    let id = req.params.id;

    try {
        let blog = await Blog.findById(id);

        res.render('blog/delete', {
            user:req.user,
            blog: blog
        });
    }
    catch (err) { 
        req.flash('error', err.message);
        res.redirect('/blog');
    }
}

// blog delete action aka delete
const blog_delete_delete = async (req, res) => {
    let id = req.params.id;

    try {
        let blog = await Blog.findById(id);
        await blog.deleteOne();
        res.redirect('/blog');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/blog');
    }
}

module.exports = {
    blog_index_get,
    blog_create_get,
    blog_create_post,
    blog_details_get,
    blog_delete_get,
    blog_delete_delete,
    blog_edit_get,
    blog_edit_put
}