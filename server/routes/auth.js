const router = require('express').Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validate = require('../middleware/validation');
const authorization = require('../middleware/authorization');

// Route for registering
router.post('/register', validate, async (req, res) => {
  try {
    // Destructuring the request's body
    const { login, password, name, surname, email, newsletter } = req.body;

    // Checking if a user with this email doesn't already exists
    //TO DO: add login comparison, not to double user logins
    const user = await pool.query(
      'SELECT * FROM service_user WHERE user_email = $1',
      [email]
    );

    // If this email is used, return an error
    if (user.rows.length !== 0) {
      return res.status(401).send('User already exists!');
    }

    // If it wasn't, then we encrypt the password with bcrypt, and insert it with the other credentials to the DB
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Inserting new user
    const newUser = await pool.query(
      'INSERT INTO service_user (user_login, user_password, user_name, user_surname, user_email, newsletter) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [login, bcryptPassword, name, surname, email, newsletter]
    );

    // Generating a token and sending it
    const token = jwtGenerator(newUser.rows[0].id_user);
    res.json({ token });
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route for logging in, uses validation middleware
router.post('/login', validate, async (req, res) => {
  try {
    // Destructuring the request's body
    const { email, password } = req.body;

    // Checking if a user with the email from request exists
    const user = await pool.query(
      'SELECT * FROM service_user WHERE user_email = $1',
      [email]
    );

    // If there is no users with this email, return an error
    if (user.rows.length === 0) {
      return res
        .status(401)
        .json("Email or password don't match any existing users!");
    }

    // Checking if the password matches, using the compare method from bcrypt
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    // If it doesn't, return an error
    if (!validPassword) {
      return res
        .status(401)
        .json("Email or password don't match any existing users!");
    }

    // Generating a token and sending it
    const token = jwtGenerator(user.rows[0].id_user);
    res.json({ token });
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Authorization middleware testing route
router.get('/is-verified', authorization, async (req, res) => {
  // Returns true if it worked through the authorization, throws error if it didn't
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
