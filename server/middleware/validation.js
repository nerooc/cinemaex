module.exports = function (req, res, next) {
  // Function checking if e-mail can exist using regular expression
  const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  if (req.path === '/register') {
    // Destructuring request's body
    const { login, password, name, surname, email, newsletter } = req.body;

    // Using Boolean() checks if all the fields are filled
    if (![login, password, name, surname, email].every(Boolean)) {
      return res.status(401).send('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.status(401).send('Invalid Email');
    }
  } else if (req.path === '/login') {
    const { email, password } = req.body;

    if (![email, password].every(Boolean)) {
      return res.status(401).send('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.status(401).send('Invalid Email');
    }
  }

  // If the data inside the request is wrong, it shows an error
  // If there are no problems, data flows through to the next step
  next();
};
