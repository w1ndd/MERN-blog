import UserRouter from "./UserRouter.js";
import PostRouter from "./PostRouter.js"
import { Router } from "express";
import CategoryRouter from "./CategoryRouter.js";
import CommentRouter from "./CommentRouter.js";

const router = new Router()

router.use('/', UserRouter)
router.use('/posts', PostRouter)
router.use('/categories', CategoryRouter)
router.use('/comments', CommentRouter)

export default router