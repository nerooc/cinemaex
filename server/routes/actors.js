const router = require('express').Router();
const pool = require('../database');
const authorization = require('../middleware/authorization');

// Actors route with authorization middleware
router.get('/', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const actors = await pool.query('SELECT * FROM actor_preview;');
    res.json(actors.rows);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// Actor names route with authorization middleware
router.get('/name', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const actors = await pool.query(
      'SELECT id_actor, actor_name, actor_surname FROM actor_preview;'
    );
    res.json(actors.rows);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// Actors route with authorization middleware
router.get('/:id', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const actor = await pool.query('SELECT * FROM get_full_actor($1);', [
      req.params.id,
    ]);
    res.json(actor.rows[0]);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

router.delete('/:id', authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteActor = await pool.query(
      'DELETE FROM actor WHERE id_actor = $1;',
      [id]
    );
    res.json('Actor deleted!');
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
