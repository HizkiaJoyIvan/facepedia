import express, {Application, Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import postRoute from './routes/postRoute'
import {connectDB} from './db'
import mongoose from 'mongoose'

const port = 3200
dotenv.config()

connectDB()
const app: Application = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)

app.get('/', (req: Request,res: Response) => {
    res.send("Hello from server")
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
        console.log("App is listening on http://localhost:3200")
    })
})

mongoose.connection.on('error', (err) => {
    console.log(err)
})