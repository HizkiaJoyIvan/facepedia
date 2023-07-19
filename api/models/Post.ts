import mongoose from 'mongoose'

interface IPost {
    userId: string
    title: string
    desc: string
    image: string
    likes: string[]
}

const postSchema = new mongoose.Schema<IPost>({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
})

export const Post = mongoose.model<IPost>('Post', postSchema)