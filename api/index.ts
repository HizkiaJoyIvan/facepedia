import express, {Application, Request, Response} from 'express'
const port = 3200

const app: Application = express()

app.get('/', (req: Request,res: Response) => {
    res.send("Hi")
})

app.listen(port, () => {
    console.log("App is listening on http://localhost:3200")
})