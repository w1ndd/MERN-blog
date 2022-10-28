import Router from 'express'
import UserController from '../controllers/UserController.js'
import {check} from 'express-validator'
import { checkAuth } from '../utils/checkAuth.js'

const UserRouter = new Router()

UserRouter.post('/registration', UserController.registration)
UserRouter.post('/login', UserController.login)
UserRouter.get('/users', checkAuth, UserController.getUsers)
UserRouter.get('/me', checkAuth, UserController.getMe)


export default UserRouter;