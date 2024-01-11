CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    hash_password VARCHAR(255)
);

CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(255),
    username VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    img_post VARCHAR(255),
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    username VARCHAR(255),
    comment_text TEXT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE likes (
    recipe_id INT,
    username VARCHAR(255),
    PRIMARY KEY (recipe_id, username),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE favorites (
    recipe_id INT,
    username VARCHAR(255),
    PRIMARY KEY (recipe_id, username),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (username) REFERENCES users(username)
);