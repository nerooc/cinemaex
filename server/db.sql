CREATE DATABASE cinemaex;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_login VARCHAR(20),
    user_password VARCHAR(60),
    user_name VARCHAR(20),
    user_surname VARCHAR(20),
    user_email VARCHAR(20),
    newsletter BOOLEAN
)

-- Inserting fake users
INSERT INTO users (user_login, user_password, user_name, user_surname, user_email, newsletter) VALUES ('nerooc', 'pierogi123', 'Tomasz', 'Gajda', 'tomek.gajda@spoko.pl', FALSE);
INSERT INTO users (user_login, user_password, user_name, user_surname, user_email, newsletter) VALUES ('piotrekPL', 'HasUo', 'Piotr', 'Babacki', 'piotrekpl@gmail.com', TRUE);

--DELETE FROM users WHERE user_id = 1 OR user_id = 2 OR user_id = 3;
SELECT * FROM users;

--Table reset
--TRUNCATE TABLE users RESTART IDENTITY;

