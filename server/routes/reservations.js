const router = require('express').Router();
const pool = require('../database');
const authorization = require('../middleware/authorization');

// Reservations route with authorization middleware
router.post('/', authorization, async (req, res) => {
  try {
    const { id_screening, seatCount } = req.body;
    const reqDate = new Date();
    const formattedReqDate = `${reqDate.getDate()}/${
      reqDate.getMonth() + 1
    }/${reqDate.getFullYear()}`;
    const formattedReqHour = `${reqDate.getHours()}:${reqDate.getMinutes()}:${reqDate.getSeconds()}`;
    const newReservation = await pool.query(
      'INSERT INTO reservation (id_user, id_screening, reservation_seatCount, reservation_date, reservation_hour) VALUES ($1, $2, $3, $4, $5);',
      [req.user.id, id_screening, seatCount, formattedReqDate, formattedReqHour]
    );

    res.json('Reservation booked!');
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

router.get('/', authorization, async (req, res) => {
  try {
    // Getting back info from user that owns the id form payload
    const reservations = await pool.query(
      'SELECT * FROM reservation_preview WHERE id_user = $1;',
      [req.user.id]
    );
    res.json(reservations.rows);
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

router.delete('/:id', authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteReservation = await pool.query(
      'DELETE FROM reservation WHERE id_reservation = $1;',
      [id]
    );
    res.json('Reservation cancelled!');
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
