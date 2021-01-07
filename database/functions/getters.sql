-- DATA GATHERING FUNCTIONS

-- retrieving all sorted screenings

CREATE OR REPLACE FUNCTION get_sorted_screenings ()
RETURNS SETOF screening_preview
LANGUAGE plpgsql
AS '
BEGIN
   RETURN QUERY	
		SELECT * FROM screening_preview 
        ORDER BY screening_preview.screening_date ASC, screening_preview.screening_hour;
END;
';

-- retrieving 2 closest screenings for the dashboard

CREATE OR REPLACE FUNCTION get_new_screenings ()
RETURNS SETOF screening_preview
LANGUAGE plpgsql
AS '
BEGIN
   RETURN QUERY	
		SELECT * FROM screening_preview
        ORDER BY screening_date ASC, screening_hour
        LIMIT 2;
END;
';

-- retrieving full information about a movie

CREATE OR REPLACE FUNCTION get_full_movie (id_movie int)
RETURNS SETOF movie_full
LANGUAGE plpgsql 
AS '
BEGIN
   RETURN QUERY	
		SELECT * FROM movie_full 
    WHERE movie_full.id_movie = $1;
END;
';

-- retrieving ids and titles of movies (for the admin panel)

CREATE OR REPLACE FUNCTION get_movie_title ()
RETURNS TABLE (id_movie INT, movie_title VARCHAR)
LANGUAGE plpgsql 
AS '
BEGIN
   RETURN QUERY	
		SELECT movie.id_movie, movie.movie_title FROM movie;
END;
';

-- retrieving ids and names of directors (for the admin panel)

CREATE OR REPLACE FUNCTION get_director_name ()
RETURNS TABLE (id_director INT, director_name VARCHAR, director_surnamename VARCHAR)
LANGUAGE plpgsql 
AS '
BEGIN
   RETURN QUERY	
		SELECT id_director, director_name, director_surname FROM director_preview;
END;
';

-- retrieving full information about an actor

CREATE OR REPLACE FUNCTION get_full_actor (id_actor int)
RETURNS SETOF actor_full
LANGUAGE plpgsql 
AS '
BEGIN
   RETURN QUERY	
		SELECT * FROM actor_full 
    WHERE actor_full.id_actor = $1;
END;
';

-- retrieving full information about a director

CREATE OR REPLACE FUNCTION get_full_director (id_director int)
RETURNS SETOF director_full
LANGUAGE plpgsql 
AS '
BEGIN
   RETURN QUERY	
		SELECT * FROM director_full 
    WHERE director_full.id_director = $1;
END;
';
