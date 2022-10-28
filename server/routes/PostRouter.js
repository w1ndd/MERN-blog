import Router from 'express'
import PostController from '../controllers/PostController.js'
import { checkAuth } from '../utils/checkAuth.js'
import multer from 'multer'

const PostRouter = new Router()

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.date + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine });

PostRouter.post('/', upload.single('image'), checkAuth, PostController.create)
PostRouter.get('/', PostController.getAll)
PostRouter.get('/:id', PostController.getOne)
PostRouter.put('/', upload.single('image'), checkAuth, PostController.update)
PostRouter.delete('/:id', checkAuth, PostController.delete)

export default PostRouter;