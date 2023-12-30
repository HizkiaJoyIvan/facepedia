import {Post} from '../models/Post'
import {User} from '../models/User'
import {Response, Request} from 'express'

export const getPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({
            message: "Post not found"
        })
        return res.status(200).json({
            data: post
        })
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        await Post.findByIdAndUpdate(postId, {
            $set: req.body
        })
        return res.status(200).json({
            message: "Post has been updated"
        })
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        await Post.findByIdAndDelete(postId)
        return res.status(200).json({
            message: "Post has been deleted"
        })
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        if(!currentUser) return res.status(404).json({
            message: "Cannot retrieve the data because the user is not found"
        })

        const userPosts = await Post.find({userId: currentUser._id})
        return res.status(200).json({
            data: userPosts
        })
    } catch(err){
        return res.status(500).json(err)
    }
}

export const getTimelinePosts = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        if(!currentUser) return res.status(404).json({
            message: "Cannot retrieve the data because the user was not found"
        })

        const userPosts = await Post.find({userId: currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId})
            })
        )

        return res.status(200).json({
            data: userPosts.concat(friendPosts.flat())
        })

    } catch(err) {
        return res.status(500).json(err)
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const post = new Post(req.body)
        await post.save()
        
        return res.status(200).json({
            message: "New post has been created"
        })
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const likePost = async (req: Request, res: Response) => {
    try {
        const postID = req.params.id
        const { userID } = req.body
        const post = await Post.findById(postID)
        const currentUser = await User.findById(userID)
        if(post && currentUser) {
            if(!post.likes.includes(userID)) {
                await post.updateOne({$push: {likes: userID}})
                return res.status(200).json({
                    message: "You has liked this post"
                })
            }
            else {
                return res.status(403).json({
                    message: "You already liked this post"
                })
            }
        }
        else {
            return res.status(404).json({
                message: "Post not found"
            })
        }

    } catch(err) {
        return res.status(500).json(err)
    }
}