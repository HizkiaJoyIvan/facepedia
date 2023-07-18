import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

export const verify = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: jwt.VerifyErrors | null, user: any) => {
            if(err) res.status(403).json('Token not valid')
            next()
        })
    } else {
        return res.status(401).json('You are not authenticated')
    }
}