import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { decodeAccessToken, deleteAccessToken, setAccessToken } from '../utils/auth';
import { getConnection } from '../utils/database';

export const checkLoggedIn = (req: Request, res: Response) => {
    const user = decodeAccessToken(req, res);
    if (user) {
        res.status(403).send('This operation requires logout!');
        return;
    }
}

export const register = async (req: Request, res: Response) => {
    checkLoggedIn(req, res);

    const { username, password } = req.body
    const connection = await getConnection()
    const [users] = await connection.execute("SELECT username FROM users WHERE username=?", [
        username,
    ])

    if (Array.isArray(users) && users.length > 0) {
        res.status(400).send("Username already in use.")
        return
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await connection.execute("INSERT INTO users (username, hashPassword) VALUES (?, ?)", [
        username,
        passwordHash
    ])

    const [results] = await connection.execute(
        "SELECT username FROM users WHERE username=?",
        [username]
    )
    const newUser = (results as any)[0]

    setAccessToken(req, res, newUser)

    res.json({ message: 'Registration was successful!'})
}

export const login = async (req: Request, res: Response) => {
    checkLoggedIn(req, res)

    const { username, password } = req.body

    const connection = await getConnection()
    const [results] = await connection.execute(
        "SELECT username, hashPassword FROM users WHERE username=?",
        [username]
    )

    if (!Array.isArray(results) || results.length == 0) {
        res.status(400).send('Wrong credentials')
        return
    }

    const userData = results[0] as any
    const passwordConfirmation = await bcrypt.compare(password, userData.password)

    if(!passwordConfirmation) {
        res.status(400).send('Wrong credentials.')
        return
    }

    delete userData.password

    setAccessToken(req, res, userData)

    res.json({ message: 'Login was successful!' })
}

export const logout = async(req: Request, res: Response) => {
    checkLoggedIn(req, res)
    deleteAccessToken(req, res)
    res.json({ message: 'Logout was successful!' })
}

export const getProfile = async (req: Request, res: Response) => {
    const user = decodeAccessToken(req, res)
    res.json(user)
}