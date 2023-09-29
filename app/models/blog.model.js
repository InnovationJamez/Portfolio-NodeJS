const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    blogImage: {
        type: Buffer,
        required: true
    },
    blogImageType: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ]
});

blogSchema.virtual('coverImagePath').get(function(){
    if(this.blogImage != null && this.blogImageType != null){
        let src = `data:${this.blogImageType};charset=utf-8;base64,${this.blogImage.toString('base64')}`;
        return src;
    }
});

module.exports = mongoose.model("Blog", blogSchema);