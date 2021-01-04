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
    res.status(500).send('Server Error');
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
    res.status(500).send('Server Error');
  }
});

module.exports = router;
