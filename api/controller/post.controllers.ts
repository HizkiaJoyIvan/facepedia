import {Post} from '../models/Post'
import {User} from '../models/User'
import {Response, Request} from 'express'

export const getPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        if(!post) return res.status(404).json('Data not found')
        return res.status(200).json(post)
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
        return res.status(200).json('Post has been updated')
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        await Post.findByIdAndDelete(postId)
        return res.status(200).json('Post has been deleted')
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        if(!currentUser) return res.status(404).json('User not found')
        const userPosts = await Post.find({userId: currentUser._id})
        return res.status(200).json(userPosts)
    } catch(err){
        return res.status(500).json(err)
    }
}

export const getTimelinePosts = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        if(!currentUser) return res.status(404).json('User not found')
        const userPosts = await Post.find({userId: currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId})
            })
        )

        res.status(200).json(userPosts.concat(friendPosts.flat()))
    } catch(err) {
        return res.status(500).json(err)
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const post = new Post(req.body)
        await post.save()
        return res.status(200).json('New post has been created')
    } catch(err) {
        return res.status(500).json(err)
    }
}