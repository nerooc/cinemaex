CREATE DATABASE cinemaex;

CREATE TYPE access_role AS ENUM (
  'administrator',
  'moderator',
  'user'
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_login VARCHAR(20),
    user_password VARCHAR(60),
    user_name VARCHAR(20),
    user_surname VARCHAR(20),
    user_email VARCHAR(20),
    user_role access_role,
    newsletter BOOLEAN
)



--DELETE FROM users WHERE user_id = 1 OR user_id = 2 OR user_id = 3;
SELECT * FROM users;

--Table reset
--TRUNCATE TABLE users RESTART IDENTITY;

