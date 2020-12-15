const router = require('express').Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

router.post('/register', async (req, res) => {
  try {
    const { login, password, name, surname, email, newsletter } = req.body;

    //TO DO: add login comparison, not to double user logins
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send('User already exists!');
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (user_login, user_password, user_name, user_surname, user_email, newsletter) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [login, bcryptPassword, name, surname, email, newsletter]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json("Email or password don't match any existing users!");
    }

    const validPassword = bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      return res
        .status(401)
        .json("Email or password don't match any existing users!");
    }

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
