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

export async function getPostsFromLoggedUser(req: Request, res: Response) {
    const user = decodeAccessToken(req, res);
    if(!user) {
        res.status(401).send('You need to be logged in to do this operation.')
        return
    }

    const connection = await getConnection()
    const [posts] = await connection.execute(
        `SELECT r.recipe_id, r.country, r.username, r.title, r.description, r.img_post,
        COUNT(DISTINCT l.username) AS like_count,
        COUNT(DISTINCT c.comment_id) AS comment_count,
        COUNT(DISTINCT f.username) AS favorite_count
        FROM recipes AS r
        LEFT JOIN likes l ON r.recipe_id = l.recipe_id
        LEFT JOIN comments c ON r.recipe_id = c.recipe_id
        LEFT JOIN favorites f ON r.recipe_id = f.recipe_id
        WHERE r.username = ?
        GROUP BY r.recipe_id;
        `,
        [user.username])
        res.json(posts);
}

export async function likePost(req: Request, res: Response) {
    const user = decodeAccessToken(req, res);
    if (!user) {
        res.status(401).send('You need to be logged in to do this operation.')
        return;
    }

    const postId = req.params.id;
    const connection = await getConnection();
    const [existingLike] = await connection.execute('SELECT * FROM likes WHERE recipe_id = ? AND username = ?', [postId, user.username]);
    if (Array.isArray(existingLike) && existingLike.length > 0) {
        await connection.execute('DELETE FROM likes WHERE username = ? AND recipe_id = ?', [user.username, postId]);
        res.json({ success: true, message: 'Like removed.' });
        return;
    }
    await connection.execute('INSERT INTO likes (recipe_id, username) VALUES (?, ?)', [postId, user.username]);

    res.json({ success: true, message: 'Like added.' })
}

export async function favoritePost(req: Request, res: Response) {
    const user = decodeAccessToken(req, res);
    if (!user) {
        res.status(401).send('You need to be logged in to do this operation.')
        return;
    }

    const postId = req.params.id;
    const connection = await getConnection();

    const [existingFavorite] = await connection.execute('SELECT * FROM favorites WHERE recipe_id = ? AND username = ?', [postId, user.username]);
    if (Array.isArray(existingFavorite) && existingFavorite.length > 0) {
        await connection.execute('DELETE FROM favorites WHERE username = ? AND recipe_id = ?', [user.username, postId]);
        res.json({ success: true, message: 'Favorite removed.' });
        return;
    }

    await connection.execute('INSERT INTO favorites (recipe_id, username) VALUES (?, ?)', [postId, user.username]);

    res.json({ success: true, message: 'Favorite added.' });
}

export async function getFavoritePostsByUser(req: Request, res: Response) {
    const user = decodeAccessToken(req, res);
    if (!user) {
        res.status(401).send('You need to be logged in to do this operation.')
        return;
    }

    const connection = await getConnection();
    const [posts] = await connection.execute(
        `SELECT r.recipe_id, r.country, r.username, r.title, r.description, r.img_post,
        COUNT(DISTINCT l.username) AS like_count,
        COUNT(DISTINCT c.comment_id) AS comment_count,
        COUNT(DISTINCT f.username) AS favorite_count
        FROM recipes AS r
        LEFT JOIN likes l ON r.recipe_id = l.recipe_id
        LEFT JOIN comments c ON r.recipe_id = c.recipe_id
        LEFT JOIN favorites f ON r.recipe_id = f.recipe_id
        WHERE f.username = ?
        GROUP BY r.recipe_id;`,
        [user.username]
    );

    res.json(posts);
}

export async function getPostById(req: Request, res: Response) {
    const connection = await getConnection();
    const post = await connection.execute(
        `SELECT 
        r.recipe_id, 
        r.country, 
        r.username,
        r.description, 
        r.title, 
        r.img_post,
        COUNT(DISTINCT l.username) AS like_count,
        COUNT(DISTINCT c.comment_id) AS comment_count,
        COUNT(DISTINCT f.username) AS favorite_count
        FROM recipes r
        LEFT JOIN likes l ON r.recipe_id = l.recipe_id
        LEFT JOIN comments c ON r.recipe_id = c.recipe_id
        LEFT JOIN favorites f ON r.recipe_id = f.recipe_id
        WHERE r.recipe_id = ?
        GROUP BY r.recipe_id`,
        [req.params.id],
    );

    res.json(post);
}

export async function getPostComments(req: Request, res: Response) {
    const connection = await getConnection();
    const [comments] = await connection.execute(
        `SELECT 
        c.comment_id,
        c.username,
        c.comment_text
        FROM comments c
        WHERE c.recipe_id = ?`,
        [req.params.id],
    );

    res.json(comments);
}

export async function sendComment(req: Request, res: Response) {
    const user = decodeAccessToken(req, res);
    if (!user) {
        res.status(401).send('You need to be logged in to do this operation.')
        return;
    }

    const commentText = req.body.comment_text;
    const postId = req.body.recipe_id;

    const connection = await getConnection();
    const [result] = await connection.execute(
        `INSERT INTO comments (username, comment_text, recipe_id) VALUES (?, ?, ?)`,
        [user.username, commentText, postId]
    );

    res.json({ success: true, message: 'Comment posted.'})
}

export async function searchPosts(req: Request, res: Response) {
    const searchTerm = req.query.term as string;
    const connection = await getConnection();
    const posts = await connection.execute(
        `SELECT 
        r.recipe_id, 
        r.country, 
        r.username,
        r.description, 
        r.title, 
        r.img_post,
        COUNT(DISTINCT l.username) AS like_count,
        COUNT(DISTINCT c.comment_id) AS comment_count,
        COUNT(DISTINCT f.username) AS favorite_count
        FROM recipes r
        LEFT JOIN likes l ON r.recipe_id = l.recipe_id
        LEFT JOIN comments c ON r.recipe_id = c.recipe_id
        LEFT JOIN favorites f ON r.recipe_id = f.recipe_id
        WHERE r.title LIKE ?
        GROUP BY r.recipe_id`,
        [`%${searchTerm}%`],
    );

    res.json(posts);
}
