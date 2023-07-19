import {User} from '../models/User'
import {Response, Request} from 'express'

export const getUser = async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
        const user = await User.findById(userId)
        if(!user) res.status(404).json('User not found')
        return res.status(200).json(user)
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const otherUserId = req.body.userId
    const userId = req.params.id
    try {
        if(otherUserId === userId){
            const user = await User.findByIdAndDelete(userId)    
            return res.status(200).json(`User with id ${userId} has been deleted`)
        } 
        else {
            return res.status(400).json('You can only delete your account')
        }
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        await User.findByIdAndUpdate(userId, {
            $set: req.body
        })
        return res.status(200).json('Your data has been updated')
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const postUser = async (req: Request, res: Response) => {
    try {
        if(!req.body.username || !req.body.pwd || !req.body.email) return res.status(400).json('Not enough field')
        const newUser = new User(req.body)
        await newUser.save()
        return res.status(200).json('New user has been created')
    } catch(err) {
        return res.status(500).json(err)
    }
}