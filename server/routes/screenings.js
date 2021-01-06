const router = require('express').Router();
const pool = require('../database');
const authorization = require('../middleware/authorization');

// Screenings route with authorization middleware
router.get('/', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const movies = await pool.query('SELECT * FROM get_sorted_screenings();');
    res.json(movies.rows);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// Screenings route with authorization middleware
router.get('/new', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const movies = await pool.query('SELECT * FROM get_new_screenings();');
    res.json(movies.rows);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
