module.exports = function (req, res, next) {
  const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  if (req.path === '/register') {
    console.log(!email.length);
    const { login, password, name, surname, email, newsletter } = req.body;

    if (![login, password, name, surname, email, newsletter].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.status(401).json('Invalid Email');
    }
  } else if (req.path === '/login') {
    const { email, password } = req.body;

    if (![email, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.status(401).json('Invalid Email');
    }
  }

  next();
};
