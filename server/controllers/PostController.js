import PostService from '../services/PostService.js'
import Post from '../models/post.js'
import User from '../models/user.js'
import Category from "../models/category.js"

class PostController {
    async create(req, res){
        try{
            const user = await User.findById(req.userId)

            var fileName = '';

            if (req.file) {
                fileName = req.body.date + req.file.originalname
            }

            const newPost = new Post({
                title: req.body.title,
                text: req.body.text,
                image: fileName,
                username: user.login,
                author: user._id,
                category: req.body.category
            })

            const post = await PostService.create(newPost)  

            return res.json(post)
        } catch(e){
            console.log(e)
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try{
            const { category, author } = req.query
            const posts = await PostService.getAll(category, author);
            const popularPosts = await PostService.getAllPopular();
            return res.json({posts, popularPosts})
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try{          
            const post = await PostService.getOne(req.params.id);
            return res.json(post)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try{
            const { title, text, id, category, date } = req.body

            const post = await Post.findById(id)

            var fileName = ''

            if (req.file) {
                fileName = date + req.file.originalname
            }

            post.title = title
            post.text = text

            //update Category's posts[] if post's category changed
            if(post.category !== category){
                await Category.findByIdAndUpdate(post.category, {
                    $pull: {posts: post._id}
                })
                await Category.findByIdAndUpdate(category, {
                    $push: {posts: post._id}
                })
            }
            post.category = category

            if(fileName !== ''){
                post.image = fileName
            }


            const updatedPost = await PostService.update(post);
            res.json(updatedPost)
        } catch(e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try{
            const post = await PostService.delete(req.params.id)
            return res.json(post)
        } catch(e) {
            res.status(500).json(e)
        }
    }
}

export default new PostController();