const db = require('../models')
const Comment = db.comment;
const Blog = db.blog;

const postComment = async (req, res)=>{
    // get the id of the blog

    try {
        // add the comment
        let newComment = new Comment({
            user: req.user.id,
            content: req.body.comment
        });

        await newComment.save();

        // get blog
        let blog = await Blog.findById(req.body.blogId);

        blog.comments.push(newComment.id);
        
        await blog.save();

        res.redirect(`/blog/details/${blog.id}`);

    } catch (err) {
        req.flash("error", err.message);
        res.redirect('/blog');
    }
}

const deleteComment = async (req, res) => {
    let comId = req.params.cid;
    let blogId = req.params.bid;

    try {
        await Comment.deleteOne({_id: comId})
        // delete reference from blog
        Blog.updateOne({_id: blogId}, {
            $pullAll: {
                comments: [comId]
            }
        });
        res.redirect('/blog');

    } catch (err) {
        req.flash("error", err.message);
        res.redirect(`/blog`);
    }
}

module.exports = {
    postComment, 
    deleteComment
}