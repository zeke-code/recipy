import { Request, Response } from "express";
import { connection } from "../utils/database";

export async function allPosts(req: Request, res: Response) {
    connection.execute(
        `SELECT 
        r.recipe_id, 
        r.country, 
        r.username, 
        r.title, 
        r.description,
        COUNT(DISTINCT l.username) AS like_count,
        COUNT(DISTINCT c.comment_id) AS comment_count,
        COUNT(DISTINCT f.username) AS favorite_count
        FROM recipes r
        LEFT JOIN likes l ON r.recipe_id = l.recipe_id
        LEFT JOIN comments c ON r.recipe_id = c.recipe_id
        LEFT JOIN favorites f ON r.recipe_id = f.recipe_id
        GROUP BY r.recipe_id
        `,
        [],
        function (err, results, field) {
            res.json(results)
        }
    )
}