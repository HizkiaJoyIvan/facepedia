import mongoose from 'mongoose'

interface IUser {
    username: string
    email: string
    password: string
    isAdmin: boolean
    profilePicture: string
    coverPicture: string
    followers: string[]
    followings: string[]
    desc?: string
    city?: string
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: [String],
      default: [],
    },
    followings: {
      type: [String],
      default: [],
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    }
  }, {
    timestamps: true,
  })


export const User = mongoose.model<IUser>('User', userSchema)