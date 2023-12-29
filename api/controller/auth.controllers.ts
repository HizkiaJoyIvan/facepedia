import {User} from "../models/User"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import path from 'path'
import ejs from 'ejs'

import {Request, Response} from "express"

export const register = async (req: Request, res: Response) => {
    const {username, email, password} = req.body
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPwd = bcrypt.hashSync(password, salt)
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPwd,
            isAdmin: false,
            profilePicture: '',
            coverPicture: '',
            followers: [],
            followings: [],
        })
        await newUser.save()
        return res.status(200).json({
            data: newUser
        })
    } catch(err){
        return res.status(500).json(err)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(404).json({
            message: "User not found"
        })

        const isPwdCorrect = await bcrypt.compareSync(req.body.password, user.password)
        if(!isPwdCorrect) return res.status(400).json({
            message: "Wrong Password"
        })
        
        const accessToken = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET_KEY as string, {expiresIn: '12h'})
        
        return res.status(200).json({
            data: user,
            token: accessToken
        })   
    } catch(err) {
        return res.status(500).json(err)
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
    }
})

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        // Mengecek apakah email yang dimasukkan sudah pernah digunakan
        if (!user) {
            return res.status(404).json({
                message: "Your email hasn't been registered. Create a new account!",
            })
        }
        // Menambahkan token khusus untuk reset password
        const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1h" })

        // Konten dari email yang dikirimkan sehingga user diarahkan ke halaman untuk reset password
        ejs.renderFile(path.join(__dirname, '..', 'views', 'email.ejs'), { username: user.username, email: user.email, resetToken }, (err, data) => {
            if(err) {
                return res.status(500).json({
                    message: err.message || "Some error occurred while generating email content.",
                })
            }

            // Buat mendefenisikan email penerima
            const mailOptions = {
                from: '"Facepedia" <' + process.env.jsonER_EMAIL + '>',
                to: email,
                subject: 'Reset Password',
                html: data,
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    return res.status(500).json(err)
                } else {
                    return res.status(200).json({
                        message: "Email sent successfully"
                    })
                }
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const userId = req.params.id
    const { resetToken, email, new_password, new_password_confirmation } = req.body

    try {
        const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET_KEY as string) as JwtPayload
        
        if (decodedToken.email !== email) {
            return res.status(401).send({
                message: "Invalid token for the provided email.",
            })
        }

        if (new_password !== new_password_confirmation) {
            return res.status(400).send({
                message: "Password and password confirmation do not match",
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedNewPassword = bcrypt.hashSync(new_password, salt)

        const result = await User.findOneAndUpdate({ email }, { password: hashedNewPassword })

        if (!result) {
            return res.status(404).send({
                message: `Cannot update User with email = ${email}. Maybe User was not found!`,
            })
        }

        return res.status(200).send({ message: "Password was reset successfully." })
    } catch (err) {
        return res.status(401).send({
            message: "Invalid or expired token.",
        })
    }
}