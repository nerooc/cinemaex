-- retrieveing full information about a movie

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

-- retrieveing ids and titles of movies (for the admin panel)

CREATE OR REPLACE FUNCTION get_movie_title ()
RETURNS TABLE (id_movie INT, movie_title VARCHAR)
LANGUAGE plpgsql 
AS '
BEGIN
   RETURN QUERY	
		SELECT movie.id_movie, movie.movie_title FROM movie;
END;
';

-- retrieveing full information about an actor

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

-- retrieveing full information about a director

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