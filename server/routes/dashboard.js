const router = require('express').Router();
const pool = require('../database');
const authorization = require('../middleware/authorization');

// Dashboard route with authorization middleware
router.get('/', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const user = await pool.query(
      'SELECT user_name FROM service_user WHERE id_user = $1',
      [req.user.id]
    );
    res.json(user.rows[0]);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
