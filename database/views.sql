-- VIEWS INSIDE THE DATABASE

-- movie preview
CREATE VIEW movie_preview AS
SELECT id_movie, movie_title, movie_release, movie_duration, movie_img 
FROM movie;

-- movie full
CREATE VIEW movie_full AS
SELECT id_movie, movie_title, movie_description, movie_release, movie_duration, movie_img, director_name, director_surname 
FROM movie m JOIN director d ON d.id_director = m.id_director;

-- screening preview
CREATE VIEW screening_preview AS
SELECT movie.id_movie, id_screening, movie_title, movie_duration, movie_img, screening_date, screening_hour, screening_price 
FROM screening JOIN movie ON movie.id_movie = screening.id_movie;

-- actor preview
CREATE VIEW actor_preview AS
SELECT id_actor, actor_name, actor_surname, actor_img 
FROM actor;

-- actor full
CREATE VIEW actor_full AS
SELECT id_actor, actor_name, actor_surname, actor_img, actor_description
FROM actor;

-- director preview
CREATE VIEW director_preview AS
SELECT id_director, director_name, director_surname, director_img 
FROM director;

-- director full
CREATE VIEW director_full AS
SELECT id_director, director_name, director_surname, director_img, director_description
FROM director;

-- reservation
CREATE VIEW reservation_preview AS
SELECT movie_title, screening_date, screening_hour, id_reservation, reservation_date, reservation_hour, id_user
FROM reservation JOIN screening ON reservation.id_screening = screening.id_screening 
JOIN movie ON screening.id_movie = movie.id_movie;