import {User} from "../models/User"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

import {Request, Response} from "express"

export const register = async (req: Request, res: Response) => {
    const {username, email, password} = req.body
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPwd = bcrypt.hashSync(password, salt)
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPwd
        })
        await newUser.save()
        return res.status(200).json({
            data: newUser
        })
    } catch(err){
        return res.status(500).json(err)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(404).json({
            message: "User not found"
        })

        const isPwdCorrect = await bcrypt.compareSync(req.body.password, user.password)
        if(!isPwdCorrect) return res.status(400).json({
            message: "Wrong Password"
        })
        
        const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY as string, {expiresIn: '12h'})
        
        return res.status(200).json({
            data: user,
            token: accessToken
        })   
    } catch(err) {
        return res.status(500).json(err)
    }
}