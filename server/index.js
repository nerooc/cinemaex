const express = require('express');
const cors = require('cors');

const app = express();

// Method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());
app.use(cors());

// Routes regarding authentication
app.use('/auth', require('./routes/auth'));

// First private route
app.use('/dashboard', require('./routes/dashboard'));

// Movies private route
app.use('/movies', require('./routes/movies'));

// Screenings private route
app.use('/screenings', require('./routes/screenings'));

// Getting custom port from arguments
const [runArgs] = process.argv.slice(2);
const port = runArgs || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
