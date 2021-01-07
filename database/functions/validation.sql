-- VALIDATION FUNCTIONS

-- 1. checking if all the form inputs are filled when adding new actor

CREATE OR REPLACE FUNCTION validate_new_actor()
RETURNS TRIGGER AS 
$_$
  BEGIN
  IF length(NEW.actor_name) < 2
  THEN RAISE EXCEPTION 'Name is too short!';
  ELSIF length(NEW.actor_surname) < 2
  THEN RAISE EXCEPTION 'Surname is too short!';
  ELSIF length(NEW.actor_description) < 5
  THEN RAISE EXCEPTION 'Description is too short!';
  ELSIF length(NEW.actor_img) < 3
  THEN RAISE EXCEPTION 'Image URL is too short!';
  END IF;
  RETURN NEW;
  END
$_$
LANGUAGE plpgsql;

-- trigger that reacts on new inserts to actor

CREATE TRIGGER validate_new_actor_trigger
  BEFORE INSERT ON actor
  FOR EACH ROW EXECUTE PROCEDURE validate_new_actor();


-- 2. checking if all the form inputs are filled when adding new director

CREATE OR REPLACE FUNCTION validate_new_director()
RETURNS TRIGGER AS 
$_$
  BEGIN
  IF length(NEW.director_name) < 2
  THEN RAISE EXCEPTION 'Name is too short!';
  ELSIF length(NEW.director_surname) < 2
  THEN RAISE EXCEPTION 'Surname is too short!';
  ELSIF length(NEW.director_description) < 5
  THEN RAISE EXCEPTION 'Description is too short!';
  ELSIF length(NEW.director_img) < 3
  THEN RAISE EXCEPTION 'Image URL is too short!';
  END IF;
  RETURN NEW;
  END
$_$
LANGUAGE plpgsql;

-- trigger that reacts on new inserts to director

CREATE TRIGGER validate_new_director_trigger
BEFORE INSERT ON director
FOR EACH ROW EXECUTE PROCEDURE validate_new_director();

-- 3. checking if all the form inputs are filled when adding new movie

CREATE OR REPLACE FUNCTION validate_new_movie()
RETURNS TRIGGER AS 
$_$
  BEGIN
  IF length(NEW.movie_title) < 2
  THEN RAISE EXCEPTION 'Title is too short!';
  ELSIF length(NEW.movie_description) < 2
  THEN RAISE EXCEPTION 'Description is too short!';
  ELSIF length(NEW.movie_release) < 2
  THEN RAISE EXCEPTION 'Fill release date!';
  ELSIF length(NEW.movie_duration) < 1
  THEN RAISE EXCEPTION 'Fill movie duration!';
  ELSIF length(NEW.movie_img) < 2
  THEN RAISE EXCEPTION 'Image URL is too short!';
  END IF;
  RETURN NEW;
  END
$_$
LANGUAGE plpgsql;

-- trigger that reacts on new inserts to movie

CREATE TRIGGER validate_new_movie_trigger
BEFORE INSERT ON movie
FOR EACH ROW EXECUTE PROCEDURE validate_new_movie();

-- 4. checking if all the form inputs are filled when adding new screening

CREATE OR REPLACE FUNCTION validate_new_screening()
RETURNS TRIGGER AS 
$_$
  BEGIN
  IF NEW.id_room < 1 OR NEW.id_room > 5
  THEN RAISE EXCEPTION 'Room number should be from 1 to 5!';
  ELSIF NEW.screening_date NOT LIKE '%_._%._%'
  THEN RAISE EXCEPTION 'Wrong date format!';
  ELSIF length(NEW.screening_date) < 2
  THEN RAISE EXCEPTION 'Fill the date!';
  ELSIF NEW.screening_price < 1
  THEN RAISE EXCEPTION 'Fill the price!';
  END IF;
  RETURN NEW;
  END
$_$
LANGUAGE plpgsql;

-- trigger that reacts on new inserts to screening

CREATE TRIGGER validate_new_screening_trigger
BEFORE INSERT ON screening
FOR EACH ROW EXECUTE PROCEDURE validate_new_screening();