const router = require('express').Router();
const pool = require('../database');
const authorization = require('../middleware/authorization');

// Movies route with authorization middleware
router.get('/', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const movies = await pool.query('SELECT * FROM movie_preview;');
    res.json(movies.rows);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// Movies route with authorization middleware
router.get('/:id', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const movie = await pool.query('SELECT * FROM movie WHERE id_movie = $1;', [
      req.params.id,
    ]);
    res.json(movie.rows[0]);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
