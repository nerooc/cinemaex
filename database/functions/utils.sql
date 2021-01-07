-- UTILITARY FUNCTIONS

-- reset table {table-name}

TRUNCATE TABLE {table-name} RESTART IDENTITY;

-- trigger that deletes movies on it's director's removal

CREATE OR REPLACE FUNCTION deleteMovie() 
  RETURNS TRIGGER 
  AS $_$
  BEGIN

    DELETE FROM movie WHERE movie.id_director = OLD.id_director;
    RETURN OLD;

  END $_$ LANGUAGE 'plpgsql';

CREATE TRIGGER delete_director
  BEFORE DELETE ON director 
  FOR EACH ROW EXECUTE PROCEDURE deleteMovie();


-- trigger that deletes screenings on it's movie's removal

CREATE FUNCTION deleteScreening() 
  RETURNS TRIGGER 
  AS $_$
  BEGIN

      DELETE FROM screening WHERE screening.id_movie = OLD.id_movie;
      RETURN OLD;

  END $_$ LANGUAGE 'plpgsql';

CREATE TRIGGER delete_movie
  BEFORE DELETE ON movie 
  FOR EACH ROW EXECUTE PROCEDURE deleteScreening();