const router = require('express').Router();
const pool = require('../database');
const authorization = require('../middleware/authorization');

// Screenings route with authorization middleware
router.get('/', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const screenings = await pool.query(
      'SELECT * FROM get_sorted_screenings();'
    );
    res.json(screenings.rows);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// Screening titles route with authorization middleware
router.get('/title', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const screenings = await pool.query(
      'SELECT id_screening, movie_title, screening_date, screening_hour FROM screening_preview;'
    );
    res.json(screenings.rows);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

router.delete('/:id', authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteScreening = await pool.query(
      'DELETE FROM screening WHERE id_screening = $1;',
      [id]
    );
    res.json('Screening deleted!');
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
    const screenings = await pool.query('SELECT * FROM get_new_screenings();');
    res.json(screenings.rows);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
