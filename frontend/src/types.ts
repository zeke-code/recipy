export type CountryFlags = {
    [key: string]: string;
    Italy: string;
    France: string;
    Japan: string;
    China: string;
    India: string;
    Mexico: string;
    Spain: string;
    Thailand: string;
    Greece: string;
    Turkey: string;
    USA: string;
}

export interface Post {
    recipe_id: number;
    country: string;
    username: string;
    title: string;
    description: string;
    like_count: number;
    comment_count: number;
    favorite_count: number;
    img_post: string;
}

export interface User {
    username: string,
    hash_password: string
}

export interface Comment {
    comment_id: number;
    recipe_id: number;
    username: string;
    comment_text: string;
}
