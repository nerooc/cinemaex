const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());

app.use(cors());
// Routes regarding authentication
app.use('/api/auth', require('./routes/auth'));

// First private route
app.use('/api/dashboard', require('./routes/dashboard'));

// Movies private route
app.use('/api/movies', require('./routes/movies'));

// Actors private route
app.use('/api/actors', require('./routes/actors'));

// Directors private route
app.use('/api/directors', require('./routes/directors'));

// Screenings private route
app.use('/api/screenings', require('./routes/screenings'));

// Reservations private route
app.use('/api/reservations', require('./routes/reservations'));

// Posting new data
app.use('/api/post', require('./routes/post'));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
