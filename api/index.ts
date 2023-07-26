import express, {Application, Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import postRoute from './routes/postRoute'
import {connectDB} from './db'
import multer, {FileFilterCallback} from 'multer'
import mongoose from 'mongoose'
import path from 'path'

const port = 3200
dotenv.config()

connectDB()
const app: Application = express()
app.use(cors())
app.use(express.json())


app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)
app.use('/api/images', express.static(path.join(__dirname, '/uploads/')))

//Middleware for uploading files
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
      cb(null, path.join(__dirname, '/uploads/'))
    },
    filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ 
  storage: storage,
  fileFilter: function (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    var ext = path.extname(file.originalname)

    if(ext !== '.jpg' && ext !== '.png' && ext !== '.mp4' && ext !== '.mkv'){
      return cb(new Error('Only videos or images are allowed!'))
    }

    cb(null, true)
  }
 })

app.post('/api/upload', upload.single('file'), (req,res) => {
    const file: Express.Multer.File | undefined = req.file
    return res.status(200).json('File uploaded')
})

app.get('/', (req: Request,res: Response) => {
    res.send("Hello from server")
})

//Connect to database
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
        console.log("App is listening on http://localhost:3200")
    })
})

mongoose.connection.on('error', (err) => {
    console.log(err)
})