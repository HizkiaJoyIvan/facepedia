import express, { Router } from "express"
import { login, register } from "../controller/authController"
const router: Router = express.Router()

router.post('/login', login)

router.post('/register', register)

export default router


