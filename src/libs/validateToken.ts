import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface IPayload {
    _id: string;
    iat: number;
    exp:number
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('token');
        if (!token) return res.status(401).send('Access Denied ☠');
        const payload = jwt.verify(token, process.env['TOKEN_AUTHCRET'] || '') as IPayload;
        req.userId = payload._id;
        next();
    } catch (e) {
      return  res.status(400).send('Invalid Token 🥴');
    }
}