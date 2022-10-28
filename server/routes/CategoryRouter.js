import Router from 'express'
import CategoryController from '../controllers/CategoryController.js'
import { checkAuth } from '../utils/checkAuth.js'

const CategoryRouter = new Router()

CategoryRouter.post('/', checkAuth, CategoryController.create)
CategoryRouter.get('/', CategoryController.getAll)
CategoryRouter.get('/:id', CategoryController.getOne)
CategoryRouter.put('/', checkAuth, CategoryController.update)
CategoryRouter.delete('/:id', checkAuth, CategoryController.delete)

export default CategoryRouter;