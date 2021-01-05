const router = require('express').Router();
const pool = require('../database');
const authorization = require('../middleware/authorization');

// Directors route with authorization middleware
router.get('/', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const directors = await pool.query('SELECT * FROM director_preview;');
    res.json(directors.rows);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// Director names route with authorization middleware
router.get('/name', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const movies = await pool.query(
      'SELECT id_director, director_name, director_surname FROM director_preview;'
    );
    res.json(movies.rows);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// Directors route with authorization middleware
router.get('/:id', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const director = await pool.query('SELECT * FROM get_full_director($1);', [
      req.params.id,
    ]);
    res.json(director.rows[0]);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
