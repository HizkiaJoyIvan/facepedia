import express, { Router } from 'express'
import { deleteUser, getUser, updateUser, createUser, followUser, unfollowUser, getFriends } from '../controller/user.controllers'
import { verifyToken } from '../middleware/auth.middleware'
const router: Router = express.Router()

router.use(verifyToken)

router.get('/:id', getUser)

router.delete('/:id', deleteUser)

router.put('/:id', updateUser)

router.post('/', createUser)

router.put('/:id/follow', followUser)

router.put('/:id/unfollow', unfollowUser)

router.get('/:id/friendlist', getFriends)

export default router
