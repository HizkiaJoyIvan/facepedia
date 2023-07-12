import {User} from "../models/User"
import bcrypt from "bcrypt"

import {Request, Response} from "express"

export const register = async (req: Request, res: Response) => {
    const {username, email, pwd} = req.body
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPwd = bcrypt.hashSync(pwd, salt)
        const newUser = new User({
            username: username,
            email: email,
            pwd: hashedPwd
        })
        await newUser.save()
        return res.status(200).json(newUser)
    } catch(err){
        return res.status(500).json(err)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(404).send("User not found")

        const isPwdCorrect = await bcrypt.compareSync(req.body.pwd, user.pwd)
        if(!isPwdCorrect) return res.status(400).send('Wrong password')

        return res.status(200).json(user)
    } catch(err) {
        return res.status(500).json(err)
    }
}