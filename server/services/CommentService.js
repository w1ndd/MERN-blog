import Comment from "../models/comment.js"
import Post from "../models/post.js"
import User from "../models/user.js"

class CommentService{
    async create(comment){ 
        const createdComment = await Comment.create(comment)

        await Post.findByIdAndUpdate(comment.post, {
            $push: {comments: comment._id}
        })
        await User.findByIdAndUpdate(comment.author, {
            $push: {comments: comment._id}
        })

        return createdComment;
    }

    async getAll(post, author) {
        var comments = []
        if(post && !author){ comments = await Comment.find({post: post}).sort('-createdAt'); }
        else if(!post && author){ comments = await Comment.find({author: author}).sort('-createdAt'); }
        else if(!post && !author){ comments = await Comment.find().sort('-createdAt'); }
        else if(post && author){ comments = await Comment.find({post: post, author: author}).sort('-createdAt'); }
        return comments;
    }

    async getOne(id) {
        if (!id) throw new Error('ID is not defined')

        const comment = await Comment.findById({_id: id})
        return comment;
    }

    async update(comment) {
        if(!comment._id) throw new Error('ID is not defined')
        const updatedComment = await comment.save()
        return updatedComment;
    }

    async delete(id) {
        if(!id) throw new Error('ID is not defined')
        const comment = await Comment.findByIdAndDelete(id);
        
        await Post.findByIdAndUpdate(comment.post, {
            $pull: {comments: id}
        })
        await User.findByIdAndUpdate(comment.author, {
            $pull: {comments: id}
        })

        return comment;
    }
}

export default new CommentService();