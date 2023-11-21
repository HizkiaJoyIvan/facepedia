import {User} from '../models/User'
import {Response, Request} from 'express'

export const getUser = async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
        const user = await User.findById(userId)
        if(!user) res.status(404).json({
            message: "User not found"
        })
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
            await User.findByIdAndDelete(userId)    
            return res.status(200).json({
                message: `User with id ${userId} has been deleted`
            })
        } 
        else {
            return res.status(400).json({
                message: "You can only delete your account"
            })
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
        return res.status(200).json({
            message: "Post has been deleted"
        })
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        if(!req.body.username || !req.body.pwd || !req.body.email) return res.status(400).json('Not enough field')
        const newUser = new User(req.body)
        await newUser.save()

        return res.status(200).json({
            message: "User has been deleted"
        })
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const followUser = async (req: Request, res: Response) => {
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(user && currentUser) {
                if(!user.followers.includes(req.body.userId)){
                    await user.updateOne({$push: {followers: req.body.userId}})
                    await currentUser.updateOne({$push: {followings: req.params.id}})

                    return res.status(200).json({
                        message: "The user has followed other"
                    })
                } else {
                    return res.status(403).json({
                        message: "The user not found"
                    })
                }
            }
            else {
                return res.status(404).json({
                    message: "The user can't follow their own account"
                })
            }
        } catch(err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json({
            message: "Error"
        })
    }
}

export const unfollowUser = async (req:Request, res:Response) => {
    if(req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(user && currentUser) {
                if(user.followers.includes(req.body.userId)){
                    await user.updateOne({$pull: {followers: req.body.userId}})
                    await currentUser.updateOne({$pull: {followings: req.params.id}})
                    return res.status(200).json({
                        message: "The user has been unfollowed"
                    })
                } else {
                    return res.status(403).json({
                        message: "The user can't unfollow their own account"
                    })
                }
            } else {
                return res.status(404).json({
                    message: "User not found"
                })
            }
        } catch(err) {
            return res.status(500).json(err)
        }
    }
    else {
        return res.status(403).json({
            message: 'You cant unfollow your own account'
        })
    }
}

export const getFriends = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findById(req.params.id)
        if(!currentUser) return res.status(404).json({
            message: "User not found"
        })
        const friendList = await Promise.all(
            currentUser.followings.map((userId) => {
                return User.findById(userId)
            })
        )
        return res.status(200).json({
            data: friendList
        })
    } catch(err) {
        return res.status(500).json(err)
    }
}

