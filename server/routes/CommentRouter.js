import Router from 'express'
import CommentController from '../controllers/CommentController.js'
import { checkAuth } from '../utils/checkAuth.js'

const CommentRouter = new Router()

CommentRouter.post('/', checkAuth, CommentController.create)
CommentRouter.get('/', CommentController.getAll)
CommentRouter.get('/:id', CommentController.getOne)
CommentRouter.put('/', checkAuth, CommentController.update)
CommentRouter.delete('/:id', checkAuth, CommentController.delete)

export default CommentRouter;