import { Request, Response } from "express";
import { getConnection } from "../utils/database";
import { decodeAccessToken } from "../utils/auth";

export async function allPosts(req: Request, res: Response) {
    const connection = await getConnection()
    const [posts] = await connection.execute(
        `SELECT 
        r.recipe_id, 
        r.country, 
        r.username, 
        r.title, 
        r.img_post,
        COUNT(DISTINCT l.username) AS like_count,
        COUNT(DISTINCT c.comment_id) AS comment_count,
        COUNT(DISTINCT f.username) AS favorite_count
        FROM recipes r
        LEFT JOIN likes l ON r.recipe_id = l.recipe_id
        LEFT JOIN comments c ON r.recipe_id = c.recipe_id
        LEFT JOIN favorites f ON r.recipe_id = f.recipe_id
        GROUP BY r.recipe_id
        `,
        )
        res.json(posts);
}

export async function createPost(req: Request, res: Response) {
    const user = decodeAccessToken(req, res);
    if(!user) {
        res.status(401).send('You need to be logged in to do this operation.')
        return
    }

    const  { country, title, description } = req.body;

    let imgPostPath: string = '';
    if (req.file) {
        imgPostPath = req.file.filename;
    }

    const conn = await getConnection()
    await conn.execute('INSERT INTO recipes ( username, country, title, description, img_post) VALUES (?, ?, ?, ?, ?)', [
        user.username,
        country,
        title,
        description,
        imgPostPath
    ])
    res.json({ success: true })
}