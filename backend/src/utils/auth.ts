import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface User {
    username: string,
    hashPass: string
}

/* JWT Secret should be stored in a safe way using .env for example.
It should also be a way longer string and generated with random values.
For the sake of simplicity of this website prototype, I will not do that. */
const JWT_SECRET = "giacomo"
const COOKIE_NAME = "recipy-access-token"

export const setAccessToken = (req: Request, res: Response, User: any) => {
    const accessToken = jwt.sign(User, JWT_SECRET, { expiresIn: '1 day'})
    res.cookie(COOKIE_NAME, accessToken, {
        maxAge: 86400000, // 1 day in milliseconds
        httpOnly: true,
        sameSite: true,
        // secure: true
        /* secure: true assures us that the cookie will only be sent
        through an HTTPS connection. For dev environment reasons,
        this is disabled, but I know that in production it should be
        true. */
    })
}

export const decodeAccessToken = (req: Request, res: Response) => {
    const accessToken = req.cookies[COOKIE_NAME]
    if (!accessToken) return null
    try {
        const user = jwt.verify(accessToken, JWT_SECRET) as User
        return user
    } catch {
        return null
    }
}

export const deleteAccessToken = (req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME)
}