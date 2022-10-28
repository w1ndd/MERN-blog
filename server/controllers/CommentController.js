import CommentService from '../services/CommentService.js'
import Comment from '../models/comment.js'
import User from '../models/user.js'

class CommentController {
    async create(req, res){
        try{
            const {text, post} = req.body

            const user = await User.findById(req.userId)
            const newComment = new Comment({
                text: text,
                authorName: user.login,
                author: req.userId,
                post: post
            })
            const comment = await CommentService.create(newComment)
            return res.json(comment)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try{
            const { post, author } = req.query
            const comments = await CommentService.getAll(post, author);
            return res.json(comments)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try{          
            const comment = await CommentService.getOne(req.params.id);
            return res.json(comment)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try{
            const updatedComment = await CommentService.update(req.body);
            return res.json(updatedComment)
        } catch(e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try{
            const comment = await CommentService.delete(req.params.id)
            return res.json(comment)
        } catch(e) {
            res.status(500).json(e)
        }
    }
}

export default new CommentController();