-- DB

CREATE DATABASE cinemaex;

-- ENUM MADE FOR 

CREATE TYPE role_type AS ENUM ('standard', 'admin');

-- TABLES

CREATE TABLE service_user (
                id_user SERIAL NOT NULL,
                user_login VARCHAR NOT NULL,
                user_password VARCHAR NOT NULL,
                user_name VARCHAR(20) NOT NULL,
                user_surname VARCHAR(20) NOT NULL,
                user_email VARCHAR NOT NULL,
                newsletter BOOLEAN NOT NULL,
                user_role role_type,
                CONSTRAINT id_user PRIMARY KEY (id_user)
);


CREATE TABLE director (
                id_director SERIAL NOT NULL,
                director_name VARCHAR(20) NOT NULL,
                director_surname VARCHAR(20) NOT NULL,
                director_description VARCHAR NOT NULL,
                director_img VARCHAR NOT NULL,
                CONSTRAINT id_director PRIMARY KEY (id_director)
);


CREATE TABLE movie (
                id_movie SERIAL NOT NULL,
                id_director INTEGER NOT NULL,
                movie_title VARCHAR(50) NOT NULL,
                movie_description VARCHAR NOT NULL,
                movie_release DATE NOT NULL,
                movie_duration TIME NOT NULL,
                movie_img VARCHAR NOT NULL,
                CONSTRAINT id_movie PRIMARY KEY (id_movie)
);


CREATE TABLE screening (
                id_screening SERIAL NOT NULL,
                id_room INTEGER NOT NULL,
                id_movie INTEGER NOT NULL,
                screening_date VARCHAR NOT NULL,
                screening_hour TIME NOT NULL,
                screening_price INTEGER NOT NULL,
                CONSTRAINT id_screening PRIMARY KEY (id_screening)
);


CREATE TABLE reservation (
                id_reservation SERIAL NOT NULL,
                id_user INTEGER NOT NULL,
                id_screening INTEGER NOT NULL,
                reservation_seatCount INTEGER NOT NULL,
                reservation_date VARCHAR NOT NULL,
                reservation_hour TIME NOT NULL,
                CONSTRAINT id_reservation PRIMARY KEY (id_reservation, id_user, id_screening)
);


CREATE TABLE actor (
                id_actor SERIAL NOT NULL,
                actor_name VARCHAR(20) NOT NULL,
                actor_surname VARCHAR(20) NOT NULL,
                actor_description VARCHAR NOT NULL,
                actor_img VARCHAR NOT NULL,
                CONSTRAINT id_actor PRIMARY KEY (id_actor)
);


CREATE TABLE actor_movie (
                id_movie INTEGER NOT NULL,
                id_actor INTEGER NOT NULL,
                CONSTRAINT x PRIMARY KEY (id_movie, id_actor)
);


CREATE TABLE room (
                id_sala SERIAL NOT NULL,
                room_name VARCHAR(20) NOT NULL,
                room_seats INTEGER NOT NULL,
                CONSTRAINT id_room PRIMARY KEY (id_sala)
);


ALTER TABLE screening ADD CONSTRAINT sala_seans_fk
FOREIGN KEY (id_room)
REFERENCES room (id_sala)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE reservation ADD CONSTRAINT uzytkownik_rezerwacja_fk
FOREIGN KEY (id_user)
REFERENCES service_user (id_user)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE movie ADD CONSTRAINT rezyser_film_fk
FOREIGN KEY (id_director)
REFERENCES director (id_director)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE screening ADD CONSTRAINT film_seans_fk
FOREIGN KEY (id_movie)
REFERENCES movie (id_movie)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE actor_movie ADD CONSTRAINT film_aktor_film_fk
FOREIGN KEY (id_movie)
REFERENCES movie (id_movie)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE reservation ADD CONSTRAINT seans_rezerwacja_fk
FOREIGN KEY (id_screening)
REFERENCES screening (id_screening)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE actor_movie ADD CONSTRAINT aktor_aktor_film_fk
FOREIGN KEY (id_actor)
REFERENCES actor (id_actor)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;