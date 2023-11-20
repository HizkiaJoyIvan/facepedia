import express, {Router} from 'express'
import { deleteUser, getUser, updateUser, postUser, followUser, unfollowUser, getFriends } from '../controller/user.controllers'
const router: Router = express.Router()

router.get('/:id', getUser)

router.delete('/:id', deleteUser)

router.put('/:id', updateUser)

router.post('/', postUser)

router.put('/:id/follow', followUser)

router.put('/:id/unfollow', unfollowUser)

router.get('/:id/friendlist', getFriends)

export default router
