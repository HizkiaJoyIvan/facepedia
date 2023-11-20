import express, { Router } from "express"
import { login, register, resetPassword, sendResetPasswordEmail } from "../controller/auth.controllers"
const router: Router = express.Router()

router.post('/login', login)

router.post('/register', register)

router.post('/forgotPassowrd', sendResetPasswordEmail)

router.post('/resetPassword/:id', resetPassword)

export default router


