const router = require('express').Router();
const pool = require('../database');
const authorization = require('../middleware/authorization');

router.post('/actor', authorization, async (req, res) => {
  try {
    // Destructuring the request's body
    const { name, surname, description, img } = req.body;

    // Inserting new actor
    const newActor = await pool.query(
      'INSERT INTO actor (actor_name, actor_surname, actor_description, actor_img) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, surname, description, img]
    );

    res.json('Successfully added an actor!');
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

router.post('/director', authorization, async (req, res) => {
  try {
    // Destructuring the request's body
    const { name, surname, description, img } = req.body;

    // Inserting new director
    const newDirector = await pool.query(
      'INSERT INTO director (director_name, director_surname, director_description, director_img) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, surname, description, img]
    );

    res.json('Successfully added a director!');
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

router.post('/movie', authorization, async (req, res) => {
  try {
    // Destructuring the request's body
    const { title, description, director, release, duration, img } = req.body;

    // Inserting new movie
    const newMovie = await pool.query(
      'INSERT INTO movie (id_director, movie_title, movie_description, movie_release, movie_duration, movie_img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [director, title, description, release, duration, img]
    );

    res.json('Successfully added a movie!');
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

router.post('/screening', authorization, async (req, res) => {
  try {
    // Destructuring the request's body
    const { room, movie, date, hour, price } = req.body;

    // Inserting new movie
    const newMovie = await pool.query(
      'INSERT INTO screening (id_room, id_movie, screening_date, screening_hour, screening_price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [room, movie, date, hour, price]
    );

    res.json('Successfully added a screening!');
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
