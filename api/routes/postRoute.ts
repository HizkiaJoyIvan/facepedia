import express, {Router} from 'express'
import {deletePost, updatePost, getPost, getAllPosts, createPost} from '../controller/postController'
const router: Router = express.Router()

router.get('/:id', getPost)

router.post('/', createPost)

router.get('/:userId', getAllPosts)

router.delete('/:id', deletePost)

router.put('/:id', updatePost)

export default router