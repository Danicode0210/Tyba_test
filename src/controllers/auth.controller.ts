
import { Request, Response } from "express"
import User, { IUser } from '../models/user'


import jwt from 'jsonwebtoken'


//Register new user
export const signUp = async (req: Request, res: Response) => {


    // Email Validation
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json('Email already exists 🤨');

    // Saving a new User
    try {
        const newUser: IUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        newUser.password = await newUser.encryptPassword(newUser.password);
        const savedUser = await newUser.save();

        const token: string = jwt.sign({ _id: savedUser._id }, process.env['TOKEN_AUTHCRET'] || '', {
            expiresIn: 60 * 60 * 24
        });

        // Header Token 
        res.header('auth-token', token).json(savedUser);
    } catch (e) {
        res.status(400).json(e);
    }
};



//Login  user
export const signIn = async (req: Request, res: Response) => {


    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json('Email or password incorrect.If you are not registered please register!');

    const validatePassword: boolean = await user.validatePassword(req.body.password);
    if (!validatePassword) return res.status(400).json('Incorrect Password 🥺')


    // Create a Token
    const token: string = jwt.sign({ _id: user._id }, process.env['TOKEN_AUTH'] || '', {
        expiresIn: 60 * 60 * 24
    });

    return res.header('auth-token', token).json(user.username + ' ' + 'Bienvenido a tu cuenta 😎')

};



//Profile user
export const profile = async (req: Request, res: Response) => {

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).json('User no found or not logged in😭');
    }
    return res.json(user);
};