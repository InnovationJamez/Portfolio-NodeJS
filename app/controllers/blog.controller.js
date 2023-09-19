const db = require('../models');
const Blog = db.blog;

/*
CRUD operations
*/

// Create
exports.create = async (req, res) => {

    // check if no info was passed
    if(!req.body.title){
        res.status(400).send({message: "Content can not be empty"});
    }
    
    // create new post
    const blog = new Blog({
        title: req.body.title,
        body: req.body.body
    });

    try {
        // save the new post
        let newBlog = await blog.save();
    }
    catch(err){
        res.status(500).send({message: err.message || "Some error occurred while created the blog"});
    }
}

// Read 
exports.findOne = (req, res) => {

}

exports.findAll = async (req, res) => {

    try {
        let blogs = Blog.find();
    }
    catch(err){

    }
}

// Update 
exports.update = (req, res) => {

}

// Delete
exports.delete = (req, res) => {

}