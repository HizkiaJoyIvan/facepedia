import express, {Router} from 'express'
import {deletePost, updatePost, getPost, getAllPosts, createPost, getTimelinePosts} from '../controller/post.controllers'
import { verifyToken } from '../middleware/auth.middleware'
const router: Router = express.Router()

router.use(verifyToken)

router.get('/:id', getPost)

router.post('/', createPost)

router.get('/all/:userId', getAllPosts)

router.get('/timeline/:userId', getTimelinePosts)

router.delete('/:id', deletePost)

router.put('/:id', updatePost)

export default router