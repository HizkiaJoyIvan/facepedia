import express, {Router} from 'express'
import { deleteUser, getUser, updateUser, postUser } from '../controller/userController'
const router: Router = express.Router()

router.get('/:id', getUser)

router.delete('/:id', deleteUser)

router.put('/:id', updateUser)

router.post('/', postUser)

export default router
