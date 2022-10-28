import User from "../models/user.js"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

class UserController {
    async registration(req, res){
        try{
            const {login, email, password} = req.body

            if (login.length < 3) return res.json({message: "Username should be longer than 3 symbols!"})
            if (email.length < 1) return res.json({message: "Email field shouldn't be empty!"})
            if (password.length < 6) return res.json({message: "Password should be longer than 5 symbols!"})

            const isUsedLogin = await User.findOne({login})
            const isUsedEmail = await User.findOne({email})

            if (isUsedLogin) return res.json({message: "User with this name is already created!"})
            if (isUsedEmail) return res.json({message: "User with this email is already created!"})

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const user = await User.create({login, email, password: hash})

            const token = generateAccessToken(user._id)
            return res.json({token, user, message: 'Registration is successful!'})
        } catch(e){
            res.json({message: 'Registration error'})
        }
    }

    async login(req, res){
        try{
            const {login, password} = req.body
            const user = await User.findOne({login})

            if (user == null) return res.json({message: "User '" + login + "' was not found!"})

            const isPasswordCorrect = await bcrypt.compare(password, user.password)

            if (!isPasswordCorrect) return res.json({message: "Wrong password!"})

            const token = generateAccessToken(user._id)
            return res.json({token, user, message: 'Logged in!'})
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res){
        try{
            const users = await User.find()
            res.json(users)
        } catch(e){
            console.log(e)
        }
    }

    async getMe(req, res){
        try{
            
            const user = await User.findById(req.userId)

            if (user == null || !user) return res.json({message: "User was not found"})

            const token = generateAccessToken(req.userId)

            res.json({
                user, token
            })
        } catch (e){
            res.json({ message: "No access"})
        }
    }
}

export default new UserController();

const generateAccessToken = (id) => {
    const payload = {
        id: id
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '31d'})
}