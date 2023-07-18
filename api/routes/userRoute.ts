import express, {Router} from 'express'
import { deleteUser, getUser, updateUser } from '../controller/userController'
const router: Router = express.Router()

router.get('/:id', getUser)

router.delete('/:id', deleteUser)

router.post('/:id', updateUser)

export default router
