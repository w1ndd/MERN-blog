import User from "../models/user.js"
import Category from "../models/category.js"
import Post from "../models/post.js"
import CommentService from './CommentService.js'

class PostService{
    async create(post){ 
        const createdPost = await Post.create(post)

        await Category.findByIdAndUpdate(post.category, {
            $push: {posts: post._id}
        })
        await User.findByIdAndUpdate(post.author, {
            $push: {posts: post._id}
        })

        return createdPost;
    }

    async getAll(category, author) {
        var posts = [];
        if(!category && !author){ posts = await Post.find().sort('-createdAt');}
        else if(category && !author){ posts = await Post.find({category: category}).sort('-createdAt');}
        else if(!category && author){ posts = await Post.find({author: author}).sort('-createdAt');}
        else if(category && author){ posts = await Post.find({author: author, category: category}).sort('-createdAt');}
        return posts;
    }

    async getAllPopular() {
        const popularPosts = await Post.find().limit(5).sort('-views');
        return popularPosts;
    }

    async getOne(id) {
        if (!id) throw new Error('ID is not defined')
        const post = await Post.findOneAndUpdate({_id: id}, {$inc: {views: 1}});
        return post;
    }

    async update(post) {
        if(!post._id) throw new Error('ID is not defined')
        const updatedPost = await post.save()
        return updatedPost;
    }

    async delete(id) {
        if(!id) throw new Error('ID is not defined')
        const post = await Post.findByIdAndDelete(id);
        await User.findByIdAndUpdate(post.author, {
            $pull: {posts: post._id}
        })
        await Category.findByIdAndUpdate(post.category, {
            $pull: {posts: post._id}
        })
        for(const id of post.comments){
            console.log(id)
            await CommentService.delete(id)
        }
        return post
    }
}

export default new PostService();